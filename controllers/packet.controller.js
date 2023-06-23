const express = require('express');
const { ObjectId } = require("mongodb");
const router = express.Router();
const packets = require('../models/packet.model')

get=async (req, res) => {
  try {
    const packet = await packets.find()
    res.send({ packet: packet })
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal Error" })
  }
}

getById=async (req, res) => {
  try {
    const { id } = req.params
    const packetById = await packets.findOne({ _id: id })
    if (packetById) {
      res.send({ packet: packetById })
    } else {
      res.status(400)
      res.send({ message: "Data Is Not Available" })
    }
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal Server Error" })
  }
}

post=async (req, res) => {
  try {
    const { type, name, description, price } = req.body
    const insertData = await packets.create({ type, name, description, price })
    if (insertData) {
      res.send({ packet: insertData })
    } else {
      res.status(400)
      res.send({ message: "Data is not Added" })
    }
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal Server Error" })
  }
}

editById=async (req, res) => {
  try {
    const { id } = req.params
    const { type, name, description, price } = req.body
    const updatedData = await packets.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          description,
          price,
        },
      }
    );
    if (updatedData.modifiedCount === 1) {
      res.send({ data: updatedData })
    } else {
      res.status(400)
      res.send({ message: "Data Is Not Updated" })
    }
  } catch (err) {
    res.status(500)
    res.send({ message: err.message || "Internal Server Error" })
  }
}

deleteById=async (req, res) => {
  try {
    const { id } = req.params
    const deletedData = await packets.deleteOne({ _id: ObjectId(id) })
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

findPacketByType=async (req,res) => {
  try {
    const {type}= req.params
    const packetByType = await packets.findOne({ type: type })
    if (packetByType) {
      res.send ({ packet: packetByType })
    } else {
      res.status(400)
      res.send ({ message: "Packet is not avaiable" })
    }
  } catch (error) {
    res.status(500)
    res.send({ message: error.message })
  }
}

module.exports = {get,getById,post,editById,deleteById,findPacketByType};