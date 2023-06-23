const express = require('express');
const { ObjectId } = require("mongodb");
const router = express.Router();
const project = require('../models/project.model')

get=async (req, res) => {
  try {
    const project = await projects.find()
    res.send({ project: project })
  } catch (err) {
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
      res.send({ message: "Data Is Not" })
    }
  } catch (err) {
    res.send({ message: "Internal Server Error" })
  }
}

post=async (req, res) => {
  try {
    const { title, source_code_url, domain_name, status } = req.body
    const insertData = await projects.create({ name, description, price })
    if (insertData) {
      res.send({ project: insertData })
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
    const updatedData = await projects.updateOne(
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
    const deletedData = await projects.deleteOne({ _id: ObjectId(id) })
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