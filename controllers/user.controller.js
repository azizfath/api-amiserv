const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local');
const users = require('../models/user.model')
const { ObjectId } = require("mongodb");

login=async (req, res, next) => {passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        const error = new Error('An error occured')
        return next(error)
      }
      if (!user){
        res.status(400)
        return res.send('Invalid Login')
      }
        // console.log(user)

      req.login(user, {session: false}, async (error) => {
        if (error) return next(error)

        const body = { id: user._id, email: user.email, role: user.role, username: user.username, nomor: user.nomor}
        const token = jwt.sign({ user: body}, 'SUDOBASH_APP')

        return res.json({"success": true,token,body})
      })
    }
    catch(err) {
      console.log(err)
      return next(err)
    }
  })(req, res, next)
}

editById=async (req, res) => {
  try {
    const { id } = req.params
    const { email,role,username,nomor } = req.body
    const updatedData = await users.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          email,username,role,nomor
        },
      }
    )
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
    const deletedData = await users.deleteOne({ _id: ObjectId(id) })
    if (deletedData) {
      res.send({ data: deletedData })
    } else {
      res.send({ message: "Data Is Not Deleted" })
    }
  } catch (error) {
    res.send({ message: error.message })
  }
}

module.exports = {login,editById,deleteById}