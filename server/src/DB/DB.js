const mongoose = require('mongoose')
const config = require('../config/config')

const connect = () =>{
    mongoose.connect(config.MONGODB_URL)

    .then(()=>{
        console.log("DataBase Connected")
    })
    .catch((err)=>{
        console.log("Connection Denied")
    })
}

module.exports = connect 