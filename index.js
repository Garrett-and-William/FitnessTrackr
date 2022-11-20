require("dotenv").config('./env');
const express = require("express")
const morgan = require("morgan")
const apiRouter = require('./api')
const cors = require('cors')



const app = express();
app.use(cors())
const client  = require("./db/client")
app.use(morgan("dev"));

client.connect()
app.use(express.json())
app.use((req, res, next) => {
    console.log('--------------------')
    console.log (req.body)
    console.log('--------------------')
    next()
})





const port = 1337;
app.listen(port, ()=> {
    console.log(`Even the Flash can't handle PORT ${port}`)
})

app.use('/api', apiRouter)