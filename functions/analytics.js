const express = require("express")
const serverless = require("serverless-http")
const cors = require("cors")
const app = express()
app.use(express.json());
app.use(cors())
const { LogEvent } = require("./handlers/analytics.js");

app.get('*', (req, res) => {
  res.send('hello!')
})

app.post("*", (req, res) => {

  try {
    const response = LogEvent(req, req.body)
    return response
  } catch (err) {
    res.send(err)
  }
})

const handler = serverless(app)
module.exports.handler = async (event, context) => {
  let myHandler = await handler(event, context)
  return myHandler
}
