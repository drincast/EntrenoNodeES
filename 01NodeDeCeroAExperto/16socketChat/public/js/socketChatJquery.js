var params = new URLSearchParams(window.location.search);

//referencias JQUERY
var divUsers = $('#divUsers');
var frmSend = $('#frmSend');
var txtMessage = $('#txtMessage');
var divChatBox = $('#divChatBox');

//funciones para renderizar usuarios del chat
function RenderUsers(people){
    var html = '';
    console.log(people);

    html += '<li>';
    html +=     '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('room') + '</span></a>';
    html += '</li>';

    for(var i=0; i < people.length; i++){
        html += '<li>';
        html +=     '<a data-id="'+ people[i].id +'" href="javascript:void(0)">';
        html +=         '<img src="assets/images/users/1.jpg" alt="user-img" class="img-circle">';
        html +=         '<span>' +people[i].name+ '<small class="text-success">online</small></span>';
        html +=     '</a>';
        html += '</li>';

    }

    divUsers.html(html);
}

function RenderMessages(message, me){
    var html = '';
    var date = new Date(message.date);
    var hour = date.getHours() + ':' + date.getMinutes();
    var adminClass = 'info';
    var admin = false;

    if('Admin' === message.name){
        adminClass = 'danger';
        admin = true;
    }

    if(!me){
        html += '<li class="animated fadeIn">';
        if(!admin)
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';

        html += '    <div class="chat-content">';
        html += '        <h5>'+message.name+'</h5>';
        html += '        <div class="box bg-light-'+adminClass+'">'+message.message+'</div>';
        html += '    </div>';
        html += '    <div class="chat-time">'+hour+'</div>';
        html += '</li>';
    }
    else{
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+message.name+'</h5>';
        html += '        <div class="box bg-light-inverse">'+message.message+'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+hour+'</div>';
        html += '</li>';
    }

    divChatBox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatBox.children('li:last-child');

    // heights
    var clientHeight = divChatBox.prop('clientHeight');
    var scrollTop = divChatBox.prop('scrollTop');
    var scrollHeight = divChatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatBox.scrollTop(scrollHeight);
    }
}



//Listener
divUsers.on('click', 'a', function(){
    var id = $(this).data('id');

    if(id)
        console.log(id);    
});

