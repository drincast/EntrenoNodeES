const opts = {
    multiplicando: {
        demand: true,
        alias: 'm',
        description: 'multiplicando'
    },
    limite:{
        default: 10,
        alias: 'l',
        description: 'hasta que numero debe multiplicar'
    }
}

const argv = require('yargs')
    .command('listar', 'imprime en consola la tabla del multiplicando (-m)', opts)
    .command('crear', 'crea un archivo de texto con la tabla del parametro multiplicando (-m)', opts)
    .help()
    .argv;

module.exports = {
    argv
};

// const argv = require('yargs')
//     .command('listar',
//              'imprime en consola la tabla del multiplicando (-m)',
//              {
//                  multiplicando: { demand: true, alias: 'm', description: 'multiplicando' },
//                  limite: { alias: 'l', default: 10, description: 'hasta que numero debe multiplicar' }
//              })
//     .command('crear',
//               'crea un archivo de texto con la tabla del parametro multiplicando (-m)',
//               {
//                   multiplicando: { demand: true, alias: 'm', description: 'multiplicando' },
//                   limite: { alias: 'l', default: 10, description: 'hasta que numero debe multiplicar' }
//               })
//     .help()
//     .argv;
