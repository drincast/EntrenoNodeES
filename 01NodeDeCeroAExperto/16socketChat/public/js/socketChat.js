var socket = io();
var params = new URLSearchParams(window.location.search);
var user = {};

function init(){
    try {
        if( !params.has('name')){            
            throw 'El nombre es necesario';
        }
    
        user = {name: params.get('name')}    
    } catch (error) {
        console.error(error);
        window.location = 'index.html';
    }
    
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterTheChat', user, function(resp){
        console.log('usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('createMessageServer', function(message) {
    console.log(message);
});

// Escuchar información
socket.on('listPeople', function(data) {
    console.log('personas conectadas', data);
});