const path = require('path')
const express = require('express')
const api = require('./server/routes/api')

const app = express()
const PORT = 8080



app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
app.use('/', api)


/*=====================================================
Start the server:
=======================================================*/

app.listen(PORT, function() {
    console.log(`Server up and running on port ${PORT}`)
})
  