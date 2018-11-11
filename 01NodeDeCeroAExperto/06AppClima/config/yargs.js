const argv = require('yargs').options({    
    ciudad:{
        alias: 'c',
        desc: 'Nombre de la ciudad',
        demand: false
    },
    direccion:{
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: false
    },
    pais: {
        alias: 'p',
        desc: 'Nombre del pais',
        demand: true
    },
}).argv;

module.exports = {
    argv
}