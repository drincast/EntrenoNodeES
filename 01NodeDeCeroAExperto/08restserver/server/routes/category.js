const express = require('express');
const { ManageErrorsMongoose } = require('../utils/ManageError');
const Category = require('../models/category');
//const bcrypt = require('bcrypt');
//const _ = require('underscore');
const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

const app = express();

app.get('/category', verifyToken, async function(req, res){
    try {
        await Category.find()
        .populate('user', 'name email')
        .sort({description: 'asc'})
        .then(lstCategories => {
            respMongoose = {
                ok: true,
                categories: lstCategories
            }
        })
        .catch(error => {
            let err = ManageErrorsMongoose(error);

            respMongoose = {
                error: {
                    message: err.message ? err.message : error,
                    all: err
                },
                statusCode: err.statusCode ? err.statusCode : 500
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

        if(error.statusCode){
            res.status(error.statusCode).json({
                ok: false,
                message: error.error.message
            });
        }
        else{
            res.status(500).json({
                ok: false,
                message: `Error en el servidor ${error}`
            });
        }

    }
});

app.get('/category/:id', verifyToken, async function(req, res){
    let query = {
        '_id': req.params.id
    }
    
    try {
        await Category.findOne(query)
        .then(lstCategory => {
            if(lstCategory === null || lstCategory === undefined){
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
                    categories: lstCategory
                }
            }
        })
        .catch(error => {
            let err = ManageErrorsMongoose(error);

            respMongoose = {
                error: {
                    message: err.message ? err.message : error,
                    all: err
                },
                statusCode: err.statusCode ? err.statusCode : 500
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

app.get('/category/description/:description', verifyToken, async function(req, res){
    let query = undefined;
    
    try {
        if(req.params.description === undefined){
            throw {
                error: {
                    message: 'la descripción es necesaria'
                },
                statusCode: 400
            }
        }

        query = {
            description: RegExp(req.params.description, 'i')
        }

        await Category.find(query)
        .then(lstCategories => {
            res.json({
                ok: true,
                lstCategories
            }); 
        })
        .catch(error => {
            let err = ManageErrorsMongoose(error);

            respMongoose = {
                error: {
                    message: err.message ? err.message : error,
                    all: err
                },
                statusCode: err.statusCode ? err.statusCode : 500
            }
        })
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

    let query = {
        '_id' : id
    }

    let options = {
        new: true,
        runValidators: true
    }

    let respMongoose = undefined;

    try {
        console.log('respMongoose inicial', respMongoose);

        await Category.findByIdAndUpdate(query, newDescription, options)
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

app.delete('/category/:id', [verifyToken, verifyAdminRole], async (req, res) => {
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
        '_id' : id
    }
    
    //actualizacion de estado para control de eliminación logica
    await Category.findOneAndRemove(query)
    .then(deleteCategory => {
        if(deleteCategory === null || deleteCategory === undefined){            
            respMongoose = {
                error: {
                    message: 'categoria no encontrada'
                },
                statusCode: 400
            }
        } else{
            respMongoose = {
                ok: true,
                category: deleteCategory
            };
        }

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
    })
    .catch(error => {
        //TODO: crear el manejo de registro de la excepción y retorno de mensaje especial al cliente
        //segun el tipo de error

        console.log('errorX', error.statusCode, error, '---fin')

        res.status(parseInt(error.statusCode)).json({
            ok: false,
            message: error.error.message
        });
    })
});

module.exports = app;

//http://localhost:3002/user