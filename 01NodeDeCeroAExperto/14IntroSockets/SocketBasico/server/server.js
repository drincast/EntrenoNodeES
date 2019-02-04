const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3002;

let server = http.createServer(app)

app.use(express.static(publicPath));

//IO = comunicación directa cliente servidor (backend)
//let io = socketIO(server); //para el mismo archivo
module.exports.io = socketIO(server);

require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});