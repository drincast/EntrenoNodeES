let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre: () => {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder} --- mmm this no es el objeto definido seria ${this}`;
    }
}

function sumar(a, b) {
    return a + b;
}

//funcion flecha
//una sola linea
let sumarFF = (a, b) => a + b;

let saludar = (nombre) => 'hola ' + nombre;

let msjFuncion = () => (`definicion de sumarFF = ${sumarFF}` );

console.log(sumar(10, 20));
console.log(sumarFF(10, 20));
console.log(saludar('alguien'));
console.log(msjFuncion());
console.log(deadpool.getNombre());
console.log();