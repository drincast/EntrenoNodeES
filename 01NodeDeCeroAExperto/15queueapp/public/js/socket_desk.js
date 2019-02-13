var socket = io();

var searchParams = new URLSearchParams(window.location.search);

console.log(searchParams.has('desk'));

if( !searchParams.has('desk') ){
    window.location = 'index.html';
    throw new Error('Falta el parametro desk (query string)');
}

var desk = searchParams.get('desk');
document.getElementById('numberDesk').innerHTML = desk;


var btnRespondNext = document.getElementById('btnRespondNext');
var smallShowTicketRespond = document.getElementById('smallShowTicketRespond');

btnRespondNext.onclick = function(){
    //smallShowTicketRespond
    socket.emit('RespondTicket', { desk: desk }, function( resp ){
        console.log('resp', resp);

        if(resp.number !== undefined){
            smallShowTicketRespond.innerHTML = 'ticket ' + resp.number;
        }
        else
            smallShowTicketRespond.innerHTML = 'no hay más tickets';
        
    })
}

console.log('escritorio: ', desk);

