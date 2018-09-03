// setTimeout(() => {
//     console.log('hola mundo !!');
// }, 3000);

let getusuarioById = (id, callback) => {
    let usuario = {
        nombre: 'Ruben',
        id: id
    }

    if(id === 20){
        callback(`el usuario con id ${ id }, no existe en la BD`);
    }
    else{
        callback(null, usuario);
    }
}

getusuarioById(20, (err, usuario) => {
    if( err ){
        return console.log('err', err);
    }

    console.log('usuario de base de datos', usuario);
});

getusuarioById(10, (err, usuario) => {
    if( err ){
        return console.log('err', err);
    }

    console.log('usuario de base de datos', usuario);
});