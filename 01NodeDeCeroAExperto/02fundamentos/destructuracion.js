let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre: function(){
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`;
    }
}

let nombred = deadpool.nombre;
let apellidod = deadpool.apellido;
let poderd = deadpool.poder;

//destructuración, mismo nombre de propiedades
let { nombre, apellido, poder } = deadpool;

//destructuración, nombre difrente de propiedades
let { nombre: nombre2, apellido: apellido2, poder: poder2 } = deadpool;

console.log(deadpool.getNombre());
console.log(nombred, apellidod, poderd);
console.log(nombre, apellido, poder);
console.log(nombre2, apellido2, poder2);