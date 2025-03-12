const config = require('./src/config/config')
const app = require('./src/app')
const connect = require('./src/DB/DB')
connect()


app.listen(config.PORT, () =>{
    console.log("server is connected on " + config.PORT)
})