const { io } = require('../server');
const { User } = require('../class/user');
const { createMessage } = require('../utils/utils');

const user = new User();

io.on('connection', (client) => {   
    client.on('enterTheChat', (data, callback) => {
        if( !data.name || !data.room){
            return callback({
                error: true,
                message: 'El nombre y la sala son requeridos'
            });
        }

        client.join(data.room);

        let people = user.AddPerson(client.id, data.name, data.room);

        //a todos menos al mismo
        // client.broadcast.to(data.room).emit('createMessageServer', {user: 'Admin', message: `${data.name} entro al chat`});

        client.broadcast.to(data.room).emit('createMessageServer', createMessage('Admin', `${data.name} entro al chat`));

        client.broadcast.to(data.room).emit('listPeople', user.GetPeopleByRoom(data.room));

        //callback(people);
        callback(user.GetPeopleByRoom(data.room));
        console.log(people);
    });

    client.on('disconnect', () => {
        let removePerson = user.RemovePerson(client.id);
        console.log('se desconecta', removePerson);
        
        // client.broadcast.to(removePerson.room).emit('createMessageServer', {user: 'Admin', message: `${removePerson.name} abandono el chat`});

        client.broadcast.to(removePerson.room).emit('createMessageServer', createMessage('Admin', `${removePerson.name} abandono el chat`));

        client.broadcast.to(removePerson.room).emit('listPeople', user.GetPeopleByRoom(removePerson.room));
    });

    client.on('sendMessageToServer', (data, callback) => {
        let person = user.GetPerson(client.id);
        let message = createMessage( person.name, data.message);
        console.log(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessageServer', message);
        callback(message);
    });

    client.on('privateMessage', data => {
        let person = user.GetPerson(client.id);
        client.broadcast.to(data.forPerson).emit('privateMessage', createMessage(person.name, data.message));
    })
});

