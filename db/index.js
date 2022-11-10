const pg = require("pg")


const Client = new pg.Client(`postgres://localhost:5432/fitness-dev`)


module.exports =
    {
        Client
    }
