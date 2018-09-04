let empleados = [
    {
        id: 1,
        nombre: 'Rubén'
    },
    {
        id: 2,
        nombre: 'Melissa'        
    },
    {
        id: 3,
        nombre: 'Juan'        
    }
];

let salarios = [
    {
        id: 1,
        salario: 2050
    },
    {
        id: 2,
        salario: 2000        
    }
];

// let getEmpleado = (id) => {

//     return new Promise((resolve, reject) => {
//         let empleadoDB = empleados.find((empleado) => (empleado.id === id));
    
//         if(!empleadoDB){
//             reject(`no existe un empleado con el id ${id}`);
//         }
//         else{
//             resolve(empleadoDB);
//         }
//     });
// }

let getEmpleado = async (id) => {
    let empleadoDB = empleados.find((empleado) => (empleado.id === id));

    if(!empleadoDB){
        throw new Error(`no existe un empleado con el id ${id}`);
    }
    else{
        return(empleadoDB);
    }
}


// let getSalario = (empleado) => {
//     return new Promise((resolve, reject) => {
//         let salarioDB = salarios.find((salario) => (salario.id === empleado.id));
    
//         if(!salarioDB){
//             reject(`no existe un salrio para el empleado ${empleado.nombre}`);
//         }
//         else{
//             resolve(
//                 {
//                     empleado: empleado.nombre,
//                     salario: salarioDB.salario
//                 }
//             );
//         }        
//     });
// }

let getSalario = async (empleado) => {
    let salarioDB = salarios.find((salario) => (salario.id === empleado.id));

    if(!salarioDB){
        throw new Error(`no existe un salrio para el empleado ${empleado.nombre}`);
    }
    else{
        return(
            {
                empleado: empleado.nombre,
                salario: salarioDB.salario
            }
        );
    }
}


// getEmpleado(1)
// .then( (empleado) => {
//     console.log(empleado);
//     return getSalario(empleado);
// })
// .then( (resp) => {
//     console.log(`el salario de ${resp.empleado} es de ${resp.salario}`);
// })
// .catch( (err) => {
//     console.log(err);
// });

let getInformacion = async (id) => {
    let empleado = await getEmpleado(id);
    let salario = await getSalario(empleado);

    // console.log(empleado);
    // console.log(salario);
    // console.log(`el salario de ${salario.empleado} es de ${salario.salario}`);

    return `el salario de ${salario.empleado} es de ${salario.salario}`;
}

getInformacion(1)
.then( (mensaje) => {
    console.log(mensaje)
})
.catch((err) => {
    console.log(err);
});