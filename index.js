const express = require("express")
const morgan = require("morgan")

const app = express();
const  client  = require("./db/client")
app.use(morgan("dev"));

client.connect()

app.use((req, res, next) => {
    next()
})





const port = 3000;
app.listen(port, ()=> {
    console.log("server has started")
})