var socket = io();

//metodos del socket
//Comando para establecer la comunicación
socket.on('connect', () => {
    console.log('Conectado al servidor');
    console.log({
        id: socket.id,
        uri: socket.io.uri
    });
});

//Escuchar eventos
socket.on('disconnect', () => {
    console.log('Perdimos conexión con el servidor');
});

//Escuchar información
socket.on('EnviarMensaje', (resp) => {
    console.log('servidor: ', resp)
})

socket.on('SendLastTicket', (resp) => {
    document.getElementById('lblNewTicket').innerHTML = resp.lastTicket;
})


//metodos del front end

document.getElementById('btnNewTicket').onclick = function(){
    console.log('click');
    socket.emit('NextTicket', socket.id, (nextTicket) => {
        console.log('desde Server nuevo ticket:', nextTicket);
        document.getElementById('lblNewTicket').innerHTML = nextTicket;
    });
}