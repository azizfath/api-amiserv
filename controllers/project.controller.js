const express = require('express');
const { ObjectId } = require("mongodb");
const router = express.Router();
const projects = require('../models/project.model')
const packets = require('../models/packet.model')

get=async (req, res) => {
  try {
    const project = await projects.find()
    res.send({ project: project })
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

add=async (req, res) => {
  try {
    let {
      title,
      source_code_url,
      domain_type,
      domain_name,
      packet_type,
      ssl_type
    } = req.body
    console.log(req.body);
    const findPacketbyType= await packets.findOne({type: packet_type})
    packet_name = findPacketbyType.name
    price = findPacketbyType.price
    let ssl_cert_file=''

    if (ssl_type==0){ssl_type='none'}
    else if (ssl_type==1){ssl_type='amiserv'}
    else if (ssl_type==2){ssl_type='self'}

    if (domain_type==0){domain_type="subdomain"}
    else if (domain_type==1){domain_type="self"}

    const insertData = await projects.create(
      {
        title,
        source_code_url,
        domain:{
          domain_type,
          domain_name
        },
        "status": "Project telah diterima, silakan melakukan pembayaran",
        "packet":{
          "packet_name": packet_name,
          "packet_price": price,
          "packet_type": packet_type
        },
        "history":[{
          "description": "Project dibuat"
        }],
        "transaction": {
          "transaction_amount": price,
          "transaction_status": "unpaid"
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
    } else {
      res.status(400)
      res.send({ message: "Data is not Added" })
    }
  } catch (err) {
    // console.log(err);
    res.status(500)
    res.send({ message: "Internal Server Error" })
  }
}

editById=async (req, res) => {
  try {
    const { id } = req.params
    let {
      title,
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

deleteById=async (req, res) => {
  try {
    const { id } = req.params
    const deletedData = await projects.deleteOne({ _id: ObjectId(id) })
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


module.exports = {get,getById,post,editById,deleteById,add};