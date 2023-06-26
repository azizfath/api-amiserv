const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const project = new Schema({
    title: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: false
    },
    source_code_url: {
        type: String,
        required:true
    },
    domain:{
        domain_type:{
            type: String,
            required:true,
        },
        domain_name:{
            type: String,
            required:true
        },
    },
    status: {
        type: String,
        required:true
    },
    status_id: {
        type: String,
        required:true
    },
    packet:{
        packet_name:{
            type: String,
        },
        packet_price:{
            type: String,
            required:true
        },
        packet_type:{
            type: String,
            required:true
        },
    },
    history:[{
        description:{
            type: String,
            required:true
        },
        time: {
            type: Date,
            default : Date.now()
        }
    }],
    transaction:{
        transaction_status:{
            type: String,
        }
    },
    ssl:{
        ssl_type:{
            type: String,
            required:true
        },
        ssl_cert_file:{
            type: String,
        }
    },
})

const projectModel = mongoose.model('project', project)

module.exports = projectModel