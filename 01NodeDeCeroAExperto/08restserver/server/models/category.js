const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema;

let validRol = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let categorySchema = new Schema({
    description: {
        required: [true, 'la descripción es necesaria'],
        type: String,
        unique: true
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
});

// userSchema.methods.toJSON = function(){
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;

//     return userObject;
// }

// userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'} )

module.exports = mongoose.model('Category', categorySchema);

