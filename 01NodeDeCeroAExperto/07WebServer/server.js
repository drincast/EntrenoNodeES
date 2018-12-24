var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    let salida = {
        nombre: 'hombre x',
        url: req.url
    }

    res.send(salida);
    //res.send('hola mundo');
});

app.get('/data', (req, res) => {
    let salida = {
        nombre: 'hombre x',
        url: req.url
    }

    res.send('hola data');
});

app.listen(3002, () => {
    console.log('ejecutando en puerto 3002');
});