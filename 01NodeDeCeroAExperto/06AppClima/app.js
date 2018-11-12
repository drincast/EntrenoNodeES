const argv = require('./config/yargs').argv;
const { obtenerDatosDireccion } = require('./lugar');
const { obtenerClimaXCoordenadas } = require('./clima');

let pais = encodeURI(argv.pais);
let ciudad = encodeURI(argv.ciudad);

let dataPlace = undefined;
let dataWeather = undefined;

obtenerDatosDireccion(undefined, pais, ciudad)
.then((res) => {
    dataPlace = res;
    console.log(dataPlace);

    if(dataPlace.findPlace){
        return obtenerClimaXCoordenadas(dataPlace.latitude, dataPlace.longitude);
    }
    else{
        throw ("Lugar no encontrado ...");
    }
})
.then((res) => {
    console.log(res);    
})
.catch((error) => console.log(`Error !!! - ${error}`));

