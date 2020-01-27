const express = require("express")
const serverless = require("serverless-http")
const app = express()
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)
const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`
const cors = require("cors")
const { CreateLicense } = require("./handlers/create-license.js");
app.use(cors())
app.use(require("body-parser").raw({ type: "*/*" }))

app.get("*", (req, res, next) => {
  CreateLicense({email: 'ali@test.com', status: 'active'}, res)
})
 
app.post("*", (req, res, next) => {
  let sig = req.headers["stripe-signature"]
  try {
    let myEvent = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    console.log("success")
    CreateLicense(myEvent, res)
  } catch (err) {
    console.log("stripe webhook auth fail")
    res.send(err)
  }
})

// or as a promise
const handler = serverless(app)
module.exports.handler = async (event, context) => {
  let myHandler = await handler(event, context)
  return myHandler
}
