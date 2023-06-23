const express = require('express');
const { ObjectId } = require("mongodb");
const router = express.Router();
const packets = require('../models/packet.model')

get=async (req, res) => {
  try {
    const packet = await packets.find()
    res.send({ packet: packet })
  } catch (err) {
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
      res.send({ message: "Data Is Not" })
    }
  } catch (err) {
    res.send({ message: "Internal Server Error" })
  }
}

post=async (req, res) => {
  try {
    const { name, description, price } = req.body
    const insertData = await packets.create({ name, description, price })
    if (insertData) {
      res.send({ packet: insertData })
    } else {
      res.send({ message: "Data is not Added" })
    }
  } catch (err) {
    res.send({ message: "Internal Server Error" })
  }
}

editById=async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price } = req.body
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
      res.send({ message: "Data Is Not Updated" })
    }
  } catch (err) {
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
      res.send({ message: "Data Is Not Deleted" })
    }
  } catch (error) {
    res.send({ message: error.message })
  }
}


module.exports = {get,getById,post,editById,deleteById};