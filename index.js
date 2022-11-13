const express = require("express")
const morgan = require("morgan")
const apiRouter = require('./api')

require("dotenv").config()

const app = express();
const  client  = require("./db/client")
app.use(morgan("dev"));

client.connect()
app.use(express.json())
app.use((req, res, next) => {
    console.log('--------------------')
    console.log (req.body)
    console.log('--------------------')
    next()
})





const port = 3000;
app.listen(port, ()=> {
    console.log(`Even the Flash can't handle PORT ${port}`)
})

app.use('/api', apiRouter)