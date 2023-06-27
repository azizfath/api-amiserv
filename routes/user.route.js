const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController= require('../controllers/user.controller')
require('../helper/passport')

router.post('/register', passport.authenticate('register', {session: false}), async (req, res, next) => {
    res.json({
        message: 'Signup success',
        user: req.user
    })
})

router.post('/login', userController.login)
router.put("/:id", userController.editById)
router.get("/:id", userController.getById)
router.delete("/:id", userController.deleteById)

module.exports = router