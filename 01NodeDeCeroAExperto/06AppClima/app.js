const argv = require('./config/yargs').argv;
const { obtenerDatosDireccion } = require('./lugar');

let pais = encodeURI(argv.pais);
let ciudad = encodeURI(argv.ciudad);

let dataPlace = undefined; 

obtenerDatosDireccion(undefined, pais, ciudad)
.then((res) => {
    dataPlace = res;
    console.log(dataPlace);
})
.catch(() => console.log(`Error !!! - ${error}`));
