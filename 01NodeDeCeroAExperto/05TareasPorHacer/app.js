const colors = require('colors');

const argv = require('./config/yargs').argv;
const tareas = require('./tareas/tareas');

let comando = argv._[0];

//console.log(comando, argv);

switch (comando) {
    case 'crear':
        let tarea = tareas.crear(argv.tarea);
        break;
    case 'listar':
        let lstTareas = tareas.obtenerTareas();

        console.log("========== Lista de tareas ==========".green);
        console.log('descripcion', '\t\t', 'realizada');

        lstTareas.forEach( (item) => {
            if(item.hasOwnProperty('descripcion'))
                console.log(item.descripcion, '\t\t', item.completado);
            
            // if(item.hasOwnProperty('hola'))
            //     console.log(item.descripcion, item.completado);
            // else
            //     console.log('no tiene hola');
        });

        console.log("=====================================".green);

        break;
    case 'actualizar':
        console.log('actualizar tareas or hacer');
        break;

    default:
        console.log('comando no identificado');
        break;
}