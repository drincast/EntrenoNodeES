const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = app;