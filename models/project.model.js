const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const project = new Schema({
    title: {
        type: String,
        required: true
    },
    source_code_url: {
        type: String,
        required:true
    },
    domain_name: {
        type: String,
        required:true
    }
    status: {
        type: String,
        required:true
    }
    service:[
        price:{
            type: String,
            required:true
        },
        name:{
            type: String,
        },
        type:{
            type: String,
            required:true
        },
    ],
    history:[
        description:{
            type: String,
            required:true
        },
        {timestamps:true}
    ],
    transaction:[
        amount:{
            type: String,
            required:true
        },
        description:{
            type: String,
        },
        {timestamps:true}
    ],
    ssl:[
        ssl_type:{
            type: String,
            required:true
        },
        ssl_cert_file:{
            type: String,
        }
    ],
})

const projectModel = mongoose.model('project', project)

module.exports = projectModel