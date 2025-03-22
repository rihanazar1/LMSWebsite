const express = require('express')
const cors = require('cors')
const webhookController = require('./controllers/webhooks.controller')
const educatorRoutes = require('./routes/educator.routes')
const courseRoutes = require('../src/routes/course.routes')
const userRoutes = require('../src/routes/user.routes')
const {clerkMiddleware} = require('@clerk/express')

const app = express()
app.use(cors())
app.use(clerkMiddleware())
// app.use(express.json())
// app.use(express.urlencoded({extended : true}));

app.get('/', (req, res )=>{
    res.send("home page")
})

app.post('/clerk', express.json(), webhookController.clerkWebhooks)
app.use('/api/educator', express.json(), educatorRoutes)
app.use('/api/course', express.json(), courseRoutes)
app.use('/api/user', express.json(), userRoutes)
app.post('/stripe', express.raw({type : 'application/json'}), webhookController.stripeWebhooks)

module.exports = app 