const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const status = new Schema({
    status_id:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    history_description: {
        type: String,
        required: true
    }
})

const statusModel = mongoose.model('status', status)

module.exports = statusModel