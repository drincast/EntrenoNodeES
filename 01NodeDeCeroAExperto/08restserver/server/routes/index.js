const express = require('express');

const app = express();

//importamos ruta de login
app.use( require('./login') );
//importamos ruta de usuario
app.use( require('./user') );
//importamos ruta de category
app.use( require('./category') );

module.exports = app;
