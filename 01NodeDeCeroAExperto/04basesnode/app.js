const colors = require('colors');

const argv = require('./config/yargs').argv;
const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar');

let comando = argv._[0];

switch (comando) {
    case 'listar':
        //console.log(argv);
        listarTabla(argv.multiplicando, argv.limite)
        .then( (laTabla) =>{
            console.log(`La tabla del ${argv.multiplicando} \n`.green);
            console.log(laTabla);
        })
        .catch( err => console.log(err));
        break;
    case 'crear':
        console.log('crear ...');
        crearArchivo(argv.multiplicando, argv.limite)
        .then( archivo => {
            console.log('Archivo creado: ' + `${archivo}`.underline.cyan);
        })
        .catch( err => console.log(err));
        break;
    default:
        console.log('comando no reconocido');
}

//module, process

let argv2 = process.argv;
// let parametro = argv[2];
// let multiplicando = parametro.split('=')[1];

//console.log(multiplicando);

console.log('multiplicando', argv.multiplicando);
console.log('limite', argv.limite);
