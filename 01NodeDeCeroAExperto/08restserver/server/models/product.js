const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema;

let validRol = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let productSchema = new Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es necesario'] 
    },
    uniquePrice: { 
        type: Number, 
        required: [true, 'El precio únitario es necesario'] 
    },
    description: { 
        type: String, 
        required: false 
    },
    available: { 
        type: Boolean, 
        required: true, 
        default: true 
    },
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    img: {
        required: false,
        type: String
    },
});

module.exports = mongoose.model('Product', productSchema);

