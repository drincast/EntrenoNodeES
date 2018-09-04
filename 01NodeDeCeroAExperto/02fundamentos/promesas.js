let empleados = [
    {
        id: 1,
        nombre: 'Mario'
    },
    {
        id: 2,
        nombre: 'Melissa'        
    },
    {
        id: 3,
        nombre: 'Andrea'        
    }
];

let salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 2000        
    }
];


let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {
        let empleadoDB = empleados.find((empleado) => (empleado.id === id));
    
        if(!empleadoDB){
            reject(`no existe un empleado con el id ${id}`);
        }
        else{
            resolve(empleadoDB);
        }
    });
}

let getSalario = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salarios.find((salario) => (salario.id === empleado.id));
    
        if(!salarioDB){
            reject(`no existe un salrio para el empleado ${empleado.nombre}`);
        }
        else{
            resolve(
                {
                    empleado: empleado.nombre,
                    salario: salarioDB.salario
                }
            );
        }        
    });
}

//basico
getEmpleado(1)
.then( (empleado) => {
    console.log('primera forma');
    console.log(empleado);
    
    getSalario(empleado)
    .then((salario) => {
        console.log(`el salario de ${salario.empleado} es de ${salario.salario}`);
    }, (err) => {
        console.log(err);
    }) ;

}, (err) => {
    console.log(err)
});

//llamado encadenado
getEmpleado(2)
.then( (empleado) => {
    console.log('\n\nsegunda forma');
    console.log(empleado);
    return getSalario(empleado);
})
.then( (resp) => {
    console.log(`el salario de ${resp.empleado} es de ${resp.salario}`);
})
.catch( (err) => {
    console.log(err);
});