let socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
    console.log(socket);
});

//Escuchar eventos
socket.on('disconnect', () => {
    console.log('Perdimos conexión con el servidor');
});

//Enviar información
socket.emit('EnviarMensaje', {
    user: 'drincast',
    message: 'hola mundo'
}, (resp) => {
    console.log('se ejecuto el callback resp server:', resp)
});

//Escuchar información
socket.on('EnviarMensaje', (resp) => {
    console.log('servidor: ', resp)
})