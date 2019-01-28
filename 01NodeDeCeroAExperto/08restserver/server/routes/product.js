const express = require('express');
const { ManageErrorsMongoose } = require('../utils/ManageError');
const Product = require('../models/product');

const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

const app = express();

app.get('/product', verifyToken, async function(req, res){
    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;
    let count = 0;
    let query = {
        available: true
    }

    try {
        await Product.find(query)
        .skip(from)
        .limit(limit)
        .populate('user', 'name email')
        .populate('category', 'description')
        .sort({name: 'asc'})
        .then(lstProducts => {
            respMongoose = {
                ok: true,
                products: lstProducts
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

app.get('/product/:id', verifyToken, async function(req, res){
    let query = undefined;
    
    try {
        if(req.params.id === undefined || req.params.id === null){
            respMongoose = {
                error: {
                    message: 'el identificador de producto es necesario '
                },
                statusCode: 400
            }
        }

        query = {
            '_id': req.params.id
        }

        await Product.findOne(query)
        .populate('user', 'name email')
        .populate('category', 'description')
        .then(lstProducts => {
            if(lstProducts === null || lstProducts === undefined){
                respMongoose = {
                    error: {
                        message: 'No existe el producto'
                    },
                    statusCode: 400
                }
            }
            else{
                respMongoose = {
                    ok: true,
                    products: lstProducts
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

app.get('/product/name/:name', verifyToken, async function(req, res){
    let name = undefined;
    
    try {
        if(req.params.name === undefined){
            throw {
                error: {
                    message: 'el nombre es necesaria'
                },
                statusCode: 400
            }
        }

        query = {
            name: RegExp(req.params.name, 'i')
        }

        await Product.find(query)
        .populate('category', 'description')
        .then(lstProducts => {
            res.json({
                ok: true,
                lstProducts
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

app.post('/product', verifyToken, async (req, res) => {
    let body = req.body;
    let product = null;

    try {
        //TODO: seperar la validacion de campos obligatorios en una función
        if(body.name === undefined){
            throw {
                error: {
                    message: 'el nombre es necesaria'
                },
                statusCode: 400
            }   
        }

        if(body.uniquePrice === undefined){
            throw {
                error: {
                    message: 'el precio es necesaria'
                },
                statusCode: 400
            }   
        }

        if(body.category === undefined){
            throw {
                error: {
                    message: 'el id de categoria es necesario'
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



        product = new Product(
            {
                name: body.name,
                uniquePrice: body.uniquePrice,
                description: body.description,
                available: body.available,
                category: body.category,
                user: req.user._id
            }
        );
        
        let respMongoose = undefined;

        await product.save()
        .then((productDB) => {
            respMongoose = {
                ok: true,
                product: productDB
            }
        })
        .catch(function(error) {
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
                res.status(201).json(respMongoose);
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

app.put('/product/:id', verifyToken, async function(req, res){
    let id = req.params.id;
    let body = req.body;

    let updateProduc = {
        name: body.name,
        uniquePrice: body.uniquePrice,
        description: body.description,
        available: body.available,
        category: body.category
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

        await Product.findByIdAndUpdate(query, updateProduc, options)
        .then(productDB => {
            if(!productDB){                
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
                    product: productDB
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

app.delete('/product/:id', verifyToken, async (req, res) => {
    let id = req.params.id;

    let options = {
        new: true,
        runValidators: true
    }

    let query = {
        '_id' : id
    }

    let updateData= {
        available: false
    }
    
    //actualizacion de estado para control de eliminación logica
    await Product.findOneAndUpdate(query, updateData, options)
    .then(deleteProduct => {
        if(deleteProduct === null || deleteProduct === undefined){            
            respMongoose = {
                error: {
                    message: 'producto no encontrado'
                },
                statusCode: 400
            }
        } else{
            respMongoose = {
                message: 'El producto se ha borrado',
                ok: true,                
                product: deleteProduct
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