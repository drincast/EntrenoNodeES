const http = require('http');

http.createServer((req, res) =>{
    res.writeHead(200,
        {
            'Content-Type': 'application/json'
        }
    );

    let salida = {
        nombre: 'hombre x',
        url: req.url
    }

    //res.write('Hola Mundo');
    res.write(JSON.stringify(salida));
    res.end();
})
.listen(3002);

console.log('ejecutando en el puerto 3002');
