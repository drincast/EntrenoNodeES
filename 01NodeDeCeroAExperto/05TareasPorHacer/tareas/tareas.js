const fs = require('fs');

let lstTareas = [];

const guardarBD = () => {
    return new Promise( (resolve, reject) => {
        if(lstTareas[0] !== undefined){
            let data = JSON.stringify(lstTareas);
            
            fs.writeFile('db/data.json', data, (err) => {
                if (err){
                    reject(err);
                }
                else{
                    resolve('se almaceno en archivo');
                }
            })
        }
        else{
            reject('No hay hay tareas para realizar');
            return;
        }
    });
}

const cargarBD = () => {
    try {        
        lstTareas = require('../db/data.json');
    } catch (error) {
        lstTareas = [];
    }
}

const obtenerTareas = () => {
    if (lstTareas[0] === undefined){
        cargarBD();
    }
    
    return lstTareas;
}

const crear = (descripcion) => {
    let tarea = {
        descripcion: descripcion,
        completado: false
    };

    cargarBD();

    lstTareas.push(tarea);

    guardarBD()
    .then( res => console.log(res))
    .catch( err => console.log(err))

    return tarea;
}

module.exports = {
    crear,
    obtenerTareas
}