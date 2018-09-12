//requireds
const fs = require('fs');

let listarTabla = (multiplicando, limite = 10) => {
    return new Promise((resolve, reject) => {
        if(!Number(multiplicando)){
            reject(`El valor del multiplicando (${multiplicando}) no es un número`);
            return;
        }

        let laTabla = '';

        for (let i = 1; i <= limite; i++) {
            laTabla = laTabla + `${multiplicando} x ${i} = ${multiplicando*i} \n`;
        }

        resolve(laTabla);
        return;
    });
}

let crearArchivo = ( multiplicando, limite = 10) => {
    return new Promise( (resolve, reject) => {
        if (!Number(multiplicando)){
            reject(`El valor del multiplicando (${multiplicando}) no es un número`);
            return;
        }

        let data = '';

        for (let i = 1; i <= limite; i++) {
            data = data + `${multiplicando.toString()} x ${i} = ${multiplicando*i} \n`;
        }

        fs.writeFile(`tablas/tabla-${multiplicando}.txt`, data, (err) => {
            if (err){
                reject(err);
            }
            else{
                resolve(`tabla-${multiplicando}.txt`)
            }
        });
    });
}

module.exports = {
    crearArchivo,
    listarTabla
}
