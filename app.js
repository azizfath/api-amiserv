const express = require('express')
const app = express()
const passport = require('passport')
require('./helper/passport')
require('./helper/dbConnection')
var cors = require('cors')

const port = 3000

app.use(express.json())
app.use(cors())

const routes = require('./routes')
app.use(routes)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})