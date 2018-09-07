const argv = require('yargs')
    .command('listar', 
             'imprime en consola la tabla del multiplicando', 
             {
                 multiplicando: { demand: true, alias: 'm', description: 'multiplicando' },
                 limite: { alias: 'l', default: 10, description: 'hasta que numero debe multiplicar' }
             })
    .help()
    .argv;

const { crearArchivo } = require('./multiplicar/multiplicar');

//module, process

let argv2 = process.argv;
// let parametro = argv[2];
// let multiplicando = parametro.split('=')[1];

//console.log(multiplicando);

console.log('base', argv.base);
console.log('limite', argv.limite);

// crearArchivo(multiplicando)
// .then( archivo => console.log(`Archivo creado ${archivo}`))
// .catch( err => console.log(err));