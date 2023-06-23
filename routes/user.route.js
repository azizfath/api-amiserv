const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController= require('../controllers/user.controller')

router.post('/register', passport.authenticate('register', {session: false}), userController.register)
router.post('/login', userController.login)
router.put("/:id", userController.editById)
router.delete("/:id", userController.deleteById)

module.exports = router