const express = require('express')
const cors = require('cors')
const webhookController = require('../src/controllers/webhooks.controllers')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res )=>{
    res.send("home page")
})

app.post('/clerk', webhookController.clerkWebhooks)


module.exports = app