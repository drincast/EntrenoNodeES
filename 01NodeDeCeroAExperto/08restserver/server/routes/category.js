const express = require('express');
const { ManageErrorsMongoose } = require('../utils/ManageError');
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

app.post('/category', verifyToken, async (req, res) => {
    let body = req.body;
    let category = null;

    try {
        if(body.description === undefined){
            throw {
                error: {
                    message: 'la descripción es necesaria'
                },
                statusCode: 400
            }   
        }

        if(req.user._id === undefined){
            throw {                
                error: {
                    message: 'no hay un usuario logeado, realice el proceso de logeo'
                },
                statusCode: 400
            }
        }

        category = new Category(
            {
                description: body.description,
                user: req.user._id
            }
        );
        
        let respMongoose = undefined;

        await category.save().then((categoryDB) => {
            respMongoose = {
                ok: true,
                category: categoryDB
            }
        })
        .catch(function(error) {
            let statusCode = error.code === 11000 ? 400 : 500;

            let err = ManageErrorsMongoose(error);
            //console.log('ManageErrorsMongoose', e01)

            // respMongoose = {
            //     error: {
            //         msj: error
            //     },
            //     statusCode
            // }

            respMongoose = {
                error: {
                    message: err.message,
                    all: err
                },
                statusCode: err.statusCode
            }
        });

        console.log('a procesar respuesta', respMongoose !== undefined)
        if(respMongoose !== undefined){
            if(respMongoose.ok){
                res.json(respMongoose);
            }
            else{
                //TODO: asignar statusCode segun el codigo de error de moongose
                throw respMongoose;
            }
        }
        else{
            throw {
                error: {
                    message: 'error en el servidor'
                },
                statusCode: 500
            }
        }        
    } catch (error) {
        //TODO: crear el manejo de registro de la excepción y retorno de mensaje especial al cliente
        //segun el tipo de error

        console.log('errorX', error, '---fin');
        res.status(error.statusCode).json({
            ok: false,
            message: error.error.message
        });        
    }
});

app.put('/category/:id', verifyToken, async function(req, res){
    let id = req.params.id;
    let body = req.body;

    let newDescription = {
        description: body.description
    }

    let options = {
        new: true,
        runValidators: true
    }

    let respMongoose = undefined;

    try {
        console.log('respMongoose inicial', respMongoose);

        await Category.findByIdAndUpdate({'_id' : id}, newDescription, options)
        .then(categoryDB => {
            if(!categoryDB){                
                respMongoose = {
                    error: {
                        message: 'No existe la categoria'
                    },
                    statusCode: 400
                }
            }
            else{
                respMongoose = {
                    ok: true,
                    category: categoryDB
                };
            }
        })
        .catch( error => {
            //TODO: asignar statusCode segun el codigo de error de moongose
            let err = ManageErrorsMongoose(error);
            console.log('ManageErrorsMongoose', err)
            respMongoose = {
                error: {
                    message: err.message,
                    all: err
                },
                statusCode: err.statusCode
            }
        }); 
        
        console.log('respMongoose procesando', respMongoose);
        if (respMongoose !== undefined) {
            if (respMongoose.ok) {
                res.json(respMongoose);
            }
            else {
                //TODO: asignar statusCode segun el codigo de error de moongose
                throw respMongoose;
            }
        } else {
            throw {
                error: {
                    message: 'Error en el servidor, error no especificado'
                },
                statusCode: 500
            }
        }
    } catch (error) {
        //TODO: crear el manejo de registro de la excepción y retorno de mensaje especial al cliente
        //segun el tipo de error

        console.log('errorX', error.statusCode, error, '---fin')

        res.status(parseInt(error.statusCode)).json({
            ok: false,
            message: error.error.message
        });
    }
});

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