/*
* Async Await
*/

// let getNombre = async() => {
//     return 'Rubén';
// }

//seria lo mismo que lo anterior
// let getNombre = () => {
//     return new Promise((resolve, reject) => {
//         resolve('Rubén');
//     })
// }

let getNombre = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Rubén');
        }, 3000);
    });
}

let saludo = async() => {
    let nombre = await getNombre();

    return `Hola ${nombre}`;
}

getNombre().then( (nombre) => {
    console.log(nombre);
})
.catch( (err) => {
    console.log('Error de ASYNC', err);
});

saludo()
.then((mensaje) => {
    console.log(mensaje);
})