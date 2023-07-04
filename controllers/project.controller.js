const express = require('express');
const { ObjectId } = require("mongodb");
const router = express.Router();
const projects = require('../models/project.model')
const packets = require('../models/packet.model')
const statuss = require('../models/status.model')
const users = require('../models/user.model')

const axios = require('axios')
require('dotenv').config()
const api_wa = process.env.API_WA_URL

get=async (req, res) => {
  try {
    const project = await projects.find({deleted:false})
    console.log(project.deleted);
    res.send({project: project})
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal Error" })
  }
}

getById=async (req, res) => {
  try {
    const { id } = req.params
    const projectById = await projects.findOne({ _id: id })
    if (projectById) {
      res.send({ project: projectById })
    } else {
      res.status(400)
      res.send({ message: "Data Is Not Available" })
    }
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal Server Error" })
  }
}

getByOwnerId=async (req, res) => {
  try {
    const { id } = req.params
    const projectByOwnerId = await projects.find({ owner_id: id, deleted: false })
    if (projectByOwnerId) {
      res.send({ project: projectByOwnerId })
    } else {
      res.status(400)
      res.send({ message: "Data Is Not Available" })
    }
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal Server Error" })
  }
}

add=async (req, res) => {
  try {
    let {
      title,
      owner_id,
      source_code_url,
      domain_type,
      domain_name,
      packet_type,
      ssl_type,
      status_id
    } = req.body
    
    const findPacketbyType= await packets.findOne({type: packet_type})
    const statusModel= await statuss.findOne({status_id:status_id})
    history_description = statusModel.history_description
    status = statusModel.description
    packet_name = findPacketbyType.name
    price = findPacketbyType.price
    let ssl_cert_file=''

    if (ssl_type==0){ssl_type='none'}
    else if (ssl_type==1){ssl_type='amiserv'}
    else if (ssl_type==2){ssl_type='self'}

    if (domain_type==0){domain_type="subdomain"}
    else if (domain_type==1){domain_type="self"}

    if (statusModel.status_id==0){transaction_status="unpaid"}
    else if (statusModel.status_id>0){transaction_status="paid"}
    
    const owner = await users.findOne({id:owner_id})

    const insertData = await projects.create(
      {
        title,
        owner_id,
        source_code_url,
        domain:{
          domain_type,
          domain_name
        },
        status_id,
        status,
        "packet":{
          "packet_name": packet_name,
          "packet_price": price,
          "packet_type": packet_type
        },
        "history":[{
          "description": history_description
        }],
        "transaction": {
          transaction_status
        },
        "ssl":{
          "ssl_type": ssl_type,
          "ssl_cert_file": ssl_cert_file
        }
      }
    )
    // console.log(insertData);
    if (insertData) {
      res.send({ project: insertData })
      await axios.post(api_wa + '/send', {
        "number":owner.nomor,
        "message":`Notifikasi Project Anda *"${title}"* di Amiserv.cloud\n=====================\n\n*Status: ${status}*\n*Deskripsi:* ${history_description}\n\n=====================\n_Pesan ini dibuat otomatis oleh Amiserv.cloud_`
      })
    } else {
      res.status(400)
      res.send({ message: "Data is not Added" })
    }
  } catch (err) {
    console.log(err);
    res.status(500)
    res.send({ message: "Internal Server Error" })
  }
}

editById=async (req, res) => {
  try {
    const { id } = req.params
    let {
      title,
      owner_id,
      source_code_url,
      domain_type,
      domain_name,
      packet_type,
      ssl_type,
      description
    } = req.body
    
    const findPacketbyType= await packets.findOne({type: packet_type})
    packet_name = findPacketbyType.name
    price = findPacketbyType.price
    let ssl_cert_file=''

    if (ssl_type==0){ssl_type='none'}
    else if (ssl_type==1){ssl_type='amiserv'}
    else if (ssl_type==2){ssl_type='self'}

    if (domain_type==0){domain_type="subdomain"}
    else if (domain_type==1){domain_type="self"}

    const updatedData = await projects.updateOne(
      { _id: ObjectId(id)  },
      {
        $set:{
          title,
          owner_id,
          source_code_url,
          domain:{
            domain_type,
            domain_name
          },
          "packet":{
            "packet_name": packet_name,
            "packet_price": price,
            "packet_type": packet_type
          },
          "ssl":{
            "ssl_type": ssl_type,
            "ssl_cert_file": ssl_cert_file
          }
        },
        $push:{
          "history":[{
            description
          }]
        }
      }
    )
    // console.log(updatedData);
    if (updatedData.modifiedCount === 1) {
      res.send({ project: updatedData })
    } else {
      res.status(400)
      res.send({ message: "Data Is Not Updated" })
    }
  } catch (err) {
    console.log(err);
    res.status(500)
    res.send({ message: "Internal Server Error" })
  }
}

editStatusById=async (req, res) => {
  try {
    const { id } = req.params
    let {
      status_id
    } = req.body
    const statusModel= await statuss.findOne({status_id:status_id})
    status = statusModel.description
    history_description = statusModel.history_description
    
    let transaction_status
    if (statusModel.status_id==0){transaction_status="unpaid"}
    else if (statusModel.status_id>0){transaction_status="paid"}

    const projectById = await projects.findOne({ _id: id })
    console.log(projectById);
    const owner = await users.findOne({_id:projectById.owner_id})
    console.log(owner);
    const updatedData = await projects.updateOne(
      { _id: ObjectId(id)  },
      {
        $set:{
          status_id,
          status,
          "transaction": {
            transaction_status
          }
        },
        $push:{
          "history":[{
            description: history_description
          }]
        }
      }
    )
    // console.log(updatedData);
    if (updatedData.modifiedCount === 1) {
      res.send({ project: updatedData })
      
      await axios.post(api_wa + '/send', {
        "number":owner.nomor,
        "message":`Notifikasi Project Anda *"${projectById.title}"* di Amiserv.cloud\n=====================\n\n*Status: ${status}*\n*Deskripsi:* ${history_description}\n\n=====================\n_Pesan ini dibuat otomatis oleh Amiserv.cloud_`
      })
    } else {
      res.status(400)
      res.send({ message: "Data Is Not Updated" })
    }
  } catch (err) {
    console.log(err);
    res.status(500)
    res.send({ message: "Internal Server Error" })
  }
}

deleteById=async (req, res) => {
  try {
    // const { id } = req.params
    // const deletedData = await projects.deleteOne({ _id: ObjectId(id) })
    // if (deletedData) {
    //   res.send({ data: deletedData })
    // } else {
    //   res.status(400)
    //   res.send({ message: "Data Is Not Deleted" })
    // }
    const { id } = req.params
    const deletedData = await projects.updateOne(
      { _id: ObjectId(id)  },
      {
        $set:{
          deleted: true
        }
      }
    )
    if (deletedData) {
      res.send({ data: deletedData })
    } else {
      res.status(400)
      res.send({ message: "Data Is Not Deleted" })
    }

  } catch (error) {
    res.status(500)
    res.send({ message: error.message })
  }
}


module.exports = {get,getById,post,editById,deleteById,add,editStatusById,getByOwnerId};