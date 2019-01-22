const express = require('express');
const Category = require('../models/category');
//const bcrypt = require('bcrypt');
//const _ = require('underscore');
const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

const app = express();

app.get('/category', verifyToken, function(req, res){
    try {
        Category.find((err, lstCategorys) => {
            if(err)
                throw (err);
            
            res.json({
                ok: true,
                lstCategorys
            }); 
        })                
    } catch (error) {
        res.status(400).json({
            ok: false,
            msj: error
        });
    }
});

app.get('/category/:id', verifyToken, function(req, res){
    let query = {}
    try {
        Category.find((err, lstCategorys) => {
            if(err)
                throw (err);
            
            res.json({
                ok: true,
                lstCategorys
            }); 
        })                
    } catch (error) {
        res.status(400).json({
            ok: false,
            msj: error
        });
    }
});

app.post('/category', verifyToken, (req, res) => {
    let body = req.body;
    let category = null;

    try {
        if(body.description === undefined){
            throw {
                statusCode: 400,
                error: {
                    ok: false,
                    msj: 'la descripción es necesaria'
                }
            }   
        }

        if(req.user._id === undefined){
            throw {
                statusCode: 400,
                error: {
                    ok: false,
                    msj: 'no hay un usuario logeado, realice el proceso de logeo'
                }
            }
        }
    
        category = new Category(
            {
                description: body.description,
                user: req.user._id
            }
        );

        category.save((err, categoryDB) => {            
            if(err){
                throw {
                    statusCode: 500,
                    error: {
                        ok: false,
                        msj: err
                    }
                }
            }

            if(!categoryDB){
                throw {
                    statusCode: 500,
                    error: {
                        ok: false,
                        msj: err
                    }
                }
            }

            res.json({
                ok: true,
                category: categoryDB
            })
        });
        
    } catch (error) {
        res.status(error.codeStatus).json({
            ok: false,
            message: error
        });    
    }
});

// app.put('/user/:id', [verifyToken, verifyAdminRole], function(req, res){
//     let id = req.params.id;
//     //solo las propiedades que quiero actualizar
//     let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

//     let options = {
//         new: true,
//         runValidators: true
//     }

//     User.findOneAndUpdate({'_id' : id}, body, options, (err, userDB) => {
//         if(err){
//             res.status(400).json({
//                 ok: false,
//                 mensaje: err
//             });
    
//             return;
//         }

//         res.json({
//             ok: true,
//             user: userDB
//         });
//     });

// });

// app.put('/user/:id', [verifyToken, verifyAdminRole], function(req, res){
//     let id = req.params.id;
//     //solo las propiedades que quiero actualizar
//     let body = _.pick(req.body, ['state']);

//     let options = {
//         new: true,
//         runValidators: true
//     }

//     User.findOneAndUpdate({'_id' : id}, body, options, (err, userDB) => {
//         if(err){
//             res.status(400).json({
//                 ok: false,
//                 message: err
//             });
    
//             return;
//         }

//         res.json({
//             ok: true,
//             user: userDB
//         });
//     });

// });

// app.delete('/user/:id', [verifyToken, verifyAdminRole], function(req, res){
//     let id = req.params.id;

//     let statefalse = false;

//     let changeState = {
//         state: statefalse
//     }

//     let options = {
//         new: true,
//         runValidators: true
//     }

//     let query = {
//         '_id' : id,
//         'state': true
//     }

//     //eliminacion fisica de la base de datos
//     //User.findOneAndRemove({'_id' : id}, (err, deleteUser) => {
    
//     //actualizacion de estado para control de eliminación logica
//     User.findOneAndUpdate(query, changeState, options, (err, deleteUser) => {
//         if(err){
//             res.status(400).json({
//                 ok: false,
//                 message: err
//             });
    
//             return;
//         }

//         if(deleteUser === null){            
//             res.status(400).json({
//                 ok: false,
//                 message: 'usuario no encontrado'
//             });
        
//             return;
//         }

//         res.json({
//             ok: true,
//             user: deleteUser
//         })
//     });
// });

module.exports = app;

//http://localhost:3002/user