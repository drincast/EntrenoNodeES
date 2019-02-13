var socket = io();

var lblTicket1 = document.getElementById('lblTicket1');
var lblDesk1 = document.getElementById('lblDesk1');

var lblTicket2 = document.getElementById('lblTicket2');
var lblDesk2 = document.getElementById('lblDesk2');

var lblTicket3 = document.getElementById('lblTicket3');
var lblDesk3 = document.getElementById('lblDesk3');

var lblTicket4 = document.getElementById('lblTicket4');
var lblDesk4 = document.getElementById('lblDesk4');

var lstLblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lstLblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

socket.on('SendLast4', function(data){
    console.log(data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    UpdateHTML( data.last4);
});

function UpdateHTML(last4){
    for (let i = 0; i < last4.length; i++) {
        lstLblTickets[i].innerHTML = 'Ticket ' + last4[i].number;
        lstLblDesks[i].innerHTML = 'Escritorio ' + last4[i].desk;        
    }
}