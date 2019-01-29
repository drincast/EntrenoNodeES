const express = require('express');

const app = express();

//importamos ruta de login
app.use( require('./login') );
//importamos ruta de usuario
app.use( require('./user') );
//importamos ruta de category
app.use( require('./category') );
//importamos ruta de category
app.use( require('./product') );
//uploads
app.use(require('./upload'));
//image
app.use(require('./image'));

module.exports = app;
