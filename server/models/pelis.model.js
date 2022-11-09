const { Schema, model } = require('mongoose');
const { commentSchema } = require('./comments.model');

const pelisSchema = new Schema({
    name: {
        type: String,
        required: [true, "Debe ingresar un nombre de pelicula"],
        minlength: [3, "Nombre de pelicula no puede tener menos de 2 caracteres"]
    },
    country: {
        type: String,
        required: [true, "Debe ingresar un pais"],
    },
    director: {
        type: String,
        required: [true, "Debe ingresar un director"],
    },
    year: {
        type: Number,
        required: [true, "Debe ingresar un precio de paquete"],
        min: [1, "La contraseña no puede ser superior a 8 caracteres"]
    }, 
    
    comments: [commentSchema],
    avg:{
        type:Number
    }

    

}, { timestamps: true });

const Peli = model('Peli', pelisSchema);

module.exports = Peli;