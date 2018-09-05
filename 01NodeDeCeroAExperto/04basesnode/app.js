const { crearArchivo } = require('./multiplicar/multiplicar');

//module, process

let argv = process.argv;
let parametro = argv[2];
let multiplicando = parametro.split('=')[1];

//console.log(multiplicando);

crearArchivo(multiplicando)
.then( archivo => console.log(`Archivo creado ${archivo}`))
.catch( err => console.log(err));