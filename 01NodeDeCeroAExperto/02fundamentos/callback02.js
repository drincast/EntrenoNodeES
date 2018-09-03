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
        salario: 1000
    },
    {
        id: 2,
        salario: 2000        
    }
];

let getEmpleado = (id, callback) => {
    let empleadoDB = empleados.find((empleado) => (empleado.id === id));

    if(!empleadoDB){
        callback(`no existe un empleado con el id ${id}`);
    }
    else{
        callback(null, empleadoDB);
    }
}

let getSalario = (empleado, callback) => {
    let salarioDB = salarios.find((salario) => (salario.id === empleado.id));

    if(!salarioDB){
        callback(`no existe un salrio para el empleado ${empleado.nombre}`);
    }
    else{
        callback(null, {empleado: empleado.nombre, salario: salarioDB.salario})
    }
}

getEmpleado(10, (err, empleado) => {
    if(err){
        return console.log('err', err);
    }
    console.log(empleado);
});

getEmpleado(1, (err, empleado) => {
    if(err){
        return console.log('err', err);
    }
    console.log(empleado);
});

getSalario(empleados[0], (err, salario) => {    
    if(err){
        return console.log('err', err);
    }
    console.log(salario);
});

getSalario(empleados[2], (err, empleado) => {
    if(err){
        return console.log('err', err);
    }
    console.log(salario);
});

getEmpleado(1, (err, empleado) => {
    if(err){
        return console.log('err', err);
    }
    
    getSalario(empleado, (err, resp) => {
        if(err){
            return console.log('err', err);
        }
        console.log(`El salario de ${resp.empleado} es de ${resp.salario}`);
    });
});