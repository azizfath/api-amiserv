const express = require('express')
const app = express()

const passport = require('passport')
const authRoutes = require('./user.route')
const packetRoutes = require('./packet.route')
const projectRoute = require('./project.route')
const statusRoute = require('./status.route')

app.get("/", (req,res)=>{
    res.send("hehe")
})

app.use('/user', authRoutes)
app.use('/packet', packetRoutes)
app.use('/project', projectRoute)
app.use('/status', statusRoute)

// app.use('/profile', passport.authenticate('jwt', { session: false }), profile);
// app.use('/content', passport.authenticate('jwt', { session: false }), content);
// app.use('/admin', passport.authenticate('jwt', { session: false }), admin);

module.exports = app