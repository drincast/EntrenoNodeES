const tarea = {
    demand: true,
    alias: 't',
    description: 'nombre de la tarea'
}

const completo ={
    default: true,
    alias: 'c',
    description: 'actualiza el estado a completo (tarea realizada)'
}

const opts = {
    tarea: {
        demand: true,
        alias: 't',
        description: 'nombre de la tarea'
    },
    completo:{
        default: true,
        alias: 'c',
        description: 'actualiza el estado a completo (tarea realizada)'
    }
}

const argv = require('yargs')
    .command('crear', 'Crea tarea por hacer', { tarea : tarea })
    .command('actualizar', 'actualiza el estado a completo (tarea realizada)', opts)
    .command('borrar', 'elimina una tarea de la lista', { tarea })
    .help()
    .argv;

    module.exports = {
        argv
    };