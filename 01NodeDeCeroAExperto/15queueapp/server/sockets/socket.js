const { io } = require('../server');
const { TicketControl } = require('../class/ticket_control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');
    //console.log(client);
    //console.log(client.nsp);
    //console.log(client.nsp.name);
    //console.log(client.nsp.connected);

    client.emit('EnviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación',
        user: '?'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }

    });

    client.emit('SendLastTicket', {
        lastTicket: ticketControl.GetLastTicket()
    });

    client.on('NextTicket', (data, fn) => {
        let next = ticketControl.next();

        console.log('ticket: ', next, 'del cliente: ', data);
        fn(next);
    })

}); 