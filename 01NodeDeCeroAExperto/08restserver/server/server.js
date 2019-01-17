require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//parse application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({extended: false}));

//parse application/json
app.use(bodyParser.json());

//configuracion global de rutas
app.use( require('./routes/index') );

//habilitar carpeta public
//TODO: ubicar em routes
app.use( express.static(path.resolve(__dirname, '../public')));

mongoose.connect(process.env.URLDB, (err, res) => {
    if(err){
        throw err;
    }

    console.log('Base de datos on air !!')
        
});

app.listen(process.env.PORT, () => {
    console.log(`Ejecutando en puerto: ${process.env.PORT}`);
});