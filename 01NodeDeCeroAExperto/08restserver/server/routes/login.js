const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    let query = {
        email: body.email
    }

    User.findOne(query, (err, userDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                message: err
            });
    
            return;
        }

        if(userDB === null){
            return res.status(400).json({
                ok: false,
                message: 'Usuario no existe'
            });
        }

        if(!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                ok: false,
                message: 'Usuario no existe.'
            });
        }

        let token = jwt.sign({user: userDB}, process.env.SEED, {expiresIn: process.env.EXPIRATION_TOKEN});

        res.json({
            ok: true,
            user: userDB,
            token
        })
    });
})

//configuraciones de google
async function verify(token) {
    let userGoogle = null;
    let error = {
        ok: true,
        msj: '',
        errSys: null
    };

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    .catch(e => {
        error.ok = false;
        error.msj = 'Ocurrio un error en la validación de credenciales';
        error.errSys = e;
    });

    if(error.ok){
        const payload = ticket.getPayload();
        //const userid = payload['sub'];
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
        
        userGoogle = {
            name: payload.name,
            email: payload.email,
            img: payload.picture,
            google: true
        }
    }
    else{
        //console.log(error);
        throw error;
    }    

    return userGoogle;
}
  //verify().catch(console.error);

app.post('/google', async (req, res) => {
    let token = req.body.idtoken;
    //console.log('tokengoogle: ', token);

    let userGoogle = await verify(token)
                            .catch( error => {                                
                                res.status(403).json({
                                    ok:false,
                                    err: error
                                });
                            });

    //console.log("eerrr ---", userGoogle.statusCode)
    //console.log("eerrr ---", userGoogle)
    //para el manejo de cuando el token no es valido
    //es porque entro al catch
    if(userGoogle === undefined){
        return false;
    }

    User.findOne({email: userGoogle.email}, (err, userDB) => {
        if(err){
            res.status(500).json({
                ok: false,
                message: err
            });
    
            return;
        }

        if(userDB){
            if(userDB.accountGoogle === false){
                res.status(400).json({
                    ok: false,
                    message: 'Debe usar la autenticación normal'
                });

                return;
            }
            else{
                let token = jwt.sign({user: userDB}, process.env.SEED, {expiresIn: process.env.EXPIRATION_TOKEN});
            }

            console.log(userDB)
            return res.json({
                ok: true,
                user: userDB,
                token
            });
        }
        else{
            let newUser = new User();
            newUser.name = userGoogle.name;
            newUser.email = userGoogle.email;
            newUser.img = userGoogle.img;
            newUser.accountGoogle = true;
            //newUser.password = ':)';
            newUser.password = bcrypt.hashSync('123456', 10);

            newUser.save( (err, userDB) => {
                if(err){
                    res.status(500).json({
                        ok: false,
                        message: err
                    });
            
                    return;
                }

                let token = jwt.sign({user: userDB}, process.env.SEED, {expiresIn: process.env.EXPIRATION_TOKEN});

                return res.json({
                    ok: true,
                    user: userDB,
                    token
                });
            });
        }
    });
})

module.exports = app;