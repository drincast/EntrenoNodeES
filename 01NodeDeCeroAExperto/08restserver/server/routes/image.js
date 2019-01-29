const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const app = express();

const User = require('../models/user');
const Product = require('../models/product');


// default options
//app.use(fileUpload());

app.get('/image/:type/:img', (req, res) => {
    let type;
    let img;

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

    let pathImg = path.resolve(__dirname, '../assets/no-image.jpg');

    res.sendFile(pathImg);

})


module.exports = app;