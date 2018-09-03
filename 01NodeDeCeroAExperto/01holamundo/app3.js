console.log('inicio del programa');

setTimeout( function(){
    console.log('1 Timeout');    
}, 3000);

setTimeout( function(){
    console.log('2 Timeout');    
}, 0);

setTimeout( function(){
    console.log('3 Timeout ..');    
}, 10);

console.log('fin programa');
