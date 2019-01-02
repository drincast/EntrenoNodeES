const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema;

let validRol = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let userSchema = new Schema({
    name: {
        required: [true, 'El nombre es necesario'],
        type: String
    },
    email: {        
        required: [true, 'El correo es necesario'],
        type: String,
        unique: true
    },
    password: {
        required: [true, 'la contraseña es obligatoria'],
        type: String
    },
    img: {
        required: false,
        type: String
    },
    role: {
        enum: validRol,
        default: 'USER_ROLE',
        type: String
    },
    state: {
        default: true,
        type: Boolean
    },
    accountGoogle: {
        default: false,
        type: Boolean
    },
});

userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'} )

module.exports = mongoose.model('User', userSchema);

