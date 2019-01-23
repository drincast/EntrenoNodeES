const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

const app = express();

app.get('/', function(req, res){
    res.json('hola express');
});

app.get('/users', verifyToken, function(req, res){
    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;
    let count = 0;
    let query = {
        state: true
    }

    User.find(query, 'accountGoogle email img name role state')
    .skip(from)
    .limit(limit)
    .exec(async (err, users) => {
        if(err){
            res.status(400).json({
                ok: false,
                message: err
            });
    
            return;
        }

        await User.count(query, (err, counting) => {
            if(err){
                res.status(400).json({
                    ok: false,
                    message: err
                });
        
                return;
            }
            
            count = counting;
        })

        res.json({
            count,
            ok: true,
            users
        });
    })
});

app.post('/user', [verifyToken, verifyAdminRole], function(req, res){
    let body = req.body;

    if(body.name === undefined){
        res.status(400).json({
            ok: false,
            message: 'nombre es necesario'
        });

        return;
    }

    let user = new User(
        {
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        }
    );

    user.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //userDB.password = null;

       res.json({
           ok: true,
           user: userDB
       }) 
    });

    // res.json({
    //     body
    // });
});

app.put('/user/:id', [verifyToken, verifyAdminRole], function(req, res){
    let id = req.params.id;
    //solo las propiedades que quiero actualizar
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    let options = {
        new: true,
        runValidators: true
    }

    User.findOneAndUpdate({'_id' : id}, body, options, (err, userDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                message: err
            });
    
            return;
        }

        res.json({
            ok: true,
            user: userDB
        });
    });

});

app.put('/user/:id', [verifyToken, verifyAdminRole], function(req, res){
    let id = req.params.id;
    //solo las propiedades que quiero actualizar
    let body = _.pick(req.body, ['state']);

    let options = {
        new: true,
        runValidators: true
    }

    User.findOneAndUpdate({'_id' : id}, body, options, (err, userDB) => {
        if(err){
            res.status(400).json({
                ok: false,
                message: err
            });
    
            return;
        }

        res.json({
            ok: true,
            user: userDB
        });
    });

});

app.delete('/user/:id', [verifyToken, verifyAdminRole], function(req, res){
    let id = req.params.id;

    let statefalse = false;

    let changeState = {
        state: statefalse
    }

    let options = {
        new: true,
        runValidators: true
    }

    let query = {
        '_id' : id,
        'state': true
    }

    //eliminacion fisica de la base de datos
    //User.findOneAndRemove({'_id' : id}, (err, deleteUser) => {
    
    //actualizacion de estado para control de eliminación logica
    User.findOneAndUpdate(query, changeState, options, (err, deleteUser) => {
        if(err){
            res.status(400).json({
                ok: false,
                message: err
            });
    
            return;
        }

        if(deleteUser === null){            
            res.status(400).json({
                ok: false,
                message: 'usuario no encontrado'
            });
        
            return;
        }

        res.json({
            ok: true,
            user: deleteUser
        })
    });
});

module.exports = app;

//http://localhost:3002/user