const express = require("express")
const serverless = require("serverless-http")
const app = express()
app.use(express.json())
const { LogEvent } = require("./handlers/analytics.js");

app.get('*', (req, res, next) => {
  res.send('hello!')
})
 
app.post("*", (req, res, next) => {
  
  try {
    LogEvent(req, res)
  } catch (err) {
    res.send(err)
  }
})

const handler = serverless(app)
module.exports.handler = async (event, context) => {
  let myHandler = await handler(event, context)
  return myHandler
}
