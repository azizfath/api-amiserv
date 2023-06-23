const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packet = new Schema({
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