const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packet = new Schema({
    type:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required:true
    }
})

const packetModel = mongoose.model('packet', packet)

module.exports = packetModel