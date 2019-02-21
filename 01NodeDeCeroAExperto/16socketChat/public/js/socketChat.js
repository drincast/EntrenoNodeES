var socket = io();
var params = new URLSearchParams(window.location.search);
var user = {};

function init(){
    var messageErr = '';
    var err = false

    try {        
        if( !params.has('name')){            
            messageErr = 'El nombre es requerido';
            err = true;
        }

        if( !params.has('room')){            
            messageErr = messageErr + ' \n ' + 'La sala es requerida';
            err = true;
        }

        if(err)
            throw messageErr;
    
        user = {name: params.get('name'), room: params.get('room')}
    } catch (error) {
        console.error(error);
        window.location = 'index.html';
    }
    
}

//Acciones/Eventos con socket.io
//Acciones de escucha socket.io
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterTheChat', user, function(resp){
        console.log('usuarios conectados', resp);
        RenderUsers(resp);
    });
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Escuchar información
socket.on('createMessageServer', function(message) {
    console.log(message);
    RenderMessages(message, false);
    scrollBottom();
});

// Escuchar información
socket.on('listPeople', function(data) {
    console.log('personas conectadas', data);
    RenderUsers(data);
});

//mensaje privado
socket.on('privateMessage', function(data) {
    console.log('Mensaje', data);
});


//Acciones de emisión socket.io
// Enviar información

function SendPrivateMessage(idPerson, messsage){
    if(idPerson !== undefined && idPerson !== null)

    if(masssage !== undefined && message !== null)

    socket.emit('privateMessage', 
                {
                    message,
                    forPersonId: idPerson
                }, 
                function(resp) {
                    console.log('respuesta server: ', resp);
                }
    );
}


//Acciones de controles de la pagina
frmSend.on('submit', function(event){            
    event.preventDefault();

    console.log('ejecutando ...');
    
    if(txtMessage.val().trim().length > 0){
        console.log(txtMessage.val());

        socket.emit('sendMessageToServer', { message: txtMessage.val() }, function(message) {            
            if(message){
                console.log('respuesta server: ', message);
                RenderMessages(message, true);
                scrollBottom();
                txtMessage.val('').focus();

            }
        });
    }
});