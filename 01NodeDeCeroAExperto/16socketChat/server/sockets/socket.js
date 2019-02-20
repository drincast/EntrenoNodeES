const { io } = require('../server');
const { User } = require('../class/user');
const { createMessage } = require('../utils/utils');

const user = new User();

io.on('connection', (client) => {   
    client.on('enterTheChat', (data, callback) => {
        if( !data.name ){
            return callback({
                error: true,
                message: 'El nombre es necesario'
            });
        }

        let people = user.AddPerson(client.id, data.name);

        //a todos menos al mismo
        client.broadcast.emit('createMessageServer', {user: 'Admin', message: `${data.name} entro al chat`});
        client.broadcast.emit('listPeople', user.GetPeople());

        callback(people);
        console.log(people);
    });

    client.on('disconnect', () => {
        let removePerson = user.RemovePerson(client.id);
        console.log('se desconecta', removePerson);
        client.broadcast.emit('createMessageServer', {user: 'Admin', message: `${removePerson.name} abandono el chat`});

        client.broadcast.emit('createMessageServer', createMessage('Admin', `${removePerson.name} abandono el chat`));

        client.broadcast.emit('listPeople', user.GetPeople());
    });

    client.on('sendMessageToServer', (data) => {
        let person = user.GetPerson(client.id);
        let message = createMessage( person.name, data.message);
        client.broadcast.emit('createMessageServer', message);
    })
});

