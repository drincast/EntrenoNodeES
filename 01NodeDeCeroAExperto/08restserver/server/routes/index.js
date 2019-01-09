const express = require('express');

const app = express();

//importamos ruta de usuario
app.use( require('./user') );
//importamos ruta de login
app.use( require('./login') );

module.exports = app;
