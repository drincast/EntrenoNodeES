const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const app = express();

const {verifyTokenImg} = require('../middlewares/authentication');

const User = require('../models/user');
const Product = require('../models/product');


// default options
//app.use(fileUpload());

app.get('/image/:type/:img', verifyTokenImg, (req, res) => {
    let type;
    let img;

    try {
        if(req.params.type === undefined || req.params.type === null){
            res.status(400).json({
                ok: false,
                message: 'Debe especificar el tipo.'
            });
            return;
        }
    
        if(req.params.img === undefined || req.params.img === null){
            res.status(400).json({
                ok: false,
                message: 'Debe especificar la imagen.'
            });
            return;
        }
    
        type = req.params.type;
        img = req.params.img;
    
        let pathUrlImg = path.resolve(__dirname, `../../uploads/${type}/${img}`);

        console.log(pathUrlImg)
    
        if(!fs.existsSync(pathUrlImg)){
            pathUrlImg = path.resolve(__dirname, '../assets/no-image.jpg');
        }else{
            let position = pathUrlImg.indexOf('https://');
            console.log(position)
        }
    
        res.sendFile(pathUrlImg);
        
    } catch (error) {
        //TODO: codificar manejo interno del error
        console.log("Error en el servidor", error)

        //retorno de mensaje para el cliente
        res.status(500).json({
            ok: false,
            message: `Error en el servido. ${error}`
        });
    }
})


module.exports = app;