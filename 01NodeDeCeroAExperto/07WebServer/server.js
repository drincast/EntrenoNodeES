var express = require('express');
var app = express();
var hbs = require('hbs');

require('./hbs/helpers')

const port = process.env.PORT || 3002;

app.use(express.static(__dirname + '/public'));

//express hbs - handlebars
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'drincast'
    });
});

app.get('/about', (req, res) => {

    res.render('about');
});

// app.get('/', (req, res) => {
//     let salida = {
//         nombre: 'hombre x',
//         url: req.url
//     }

//     res.send(salida);
//     //res.send('hola mundo');
// });

// app.get('/data', (req, res) => {
//     let salida = {
//         nombre: 'hombre x',
//         url: req.url
//     }

//     res.send('hola data');
// });

app.listen(port, () => {
    console.log(`ejecutando en puerto ${port}`);
});