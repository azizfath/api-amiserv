const express = require('express');
const { ObjectId } = require("mongodb");
const router = express.Router();
const statuss = require('../models/status.model')

get=async (req, res) => {
  try {
    const status = await statuss.find()
    res.send({ status: status })
  } catch (err) {
    res.status(500)
    res.send({ message: "Internal Error" })
  }
}

getById=async (req, res) => {
  try {
    const { id } = req.params
    const statusById = await statuss.findOne({ _id: id })
    if (statusById) {
      res.send({ status: statusById })
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
    const { status_id, description, history_description } = req.body
    const insertData = await statuss.create({status_id, description, history_description})
    if (insertData) {
      res.send({ status: insertData })
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
    const {status_id, description, history_description } = req.body
    const updatedData = await statuss.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          status_id,
          description,
          history_description
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
    const deletedData = await statuss.deleteOne({ _id: ObjectId(id) })
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

module.exports = {get,getById,post,editById,deleteById};