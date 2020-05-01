const express = require("express")
const serverless = require("serverless-http")
const cors = require("cors")
const app = express()
app.use(cors())
const nano = require('nano')(`https://aliblackwell:${process.env.KEYPAWS_BACKEND_PASSWORD}@db.keypa.ws:6984`);

app.get("*", async (req, res) => {

    try {
        const paymentsDb = nano.db.use('payments')

        const payment = await paymentsDb.get(req.query.id)
        res.send(payment)
    } catch (error) {
        res.send(error)
    }

})

// or as a promise
const handler = serverless(app)
module.exports.handler = async (event, context) => {
    let myHandler = await handler(event, context)
    return myHandler
}
