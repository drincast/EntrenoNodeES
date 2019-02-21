var params = new URLSearchParams(window.location.search);

//referencias JQUERY
var divUsers = $('#divUsers')

//funciones para renderizar usuarios del chat
function renderUsers(people){
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