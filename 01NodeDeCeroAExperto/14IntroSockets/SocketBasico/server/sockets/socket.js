const { io } = require('../server');

io.on('connection', (client) => {
    console.log('usuario conectado');

    client.on('disconnect', () => {
        console.log('usuario desconectado');
    });

    //escuchar cliente
    client.on('EnviarMensaje', (data, callback) => {
        console.log(data);

        // if(message.user){
        //     callback({
        //         resp: 'TODO BIEN !!'
        //     });
        // }else{
        //     callback({
        //         resp: 'TODO MAL !!'
        //     });
        // }

        client.broadcast.emit('EnviarMensaje', data);
        
    });

    client.emit('EnviarMensaje', {
        user: 'Admin',
        message: 'bienvenido a la app'
    });
})