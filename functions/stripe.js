const express = require("express")
const serverless = require("serverless-http")
const app = express()
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)
const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`
const cors = require("cors")
const { CreateLicense } = require("./handlers/create-license.js");
const { CreatePayment } = require("./handlers/create-payment.js");
app.use(cors())
app.use(require("body-parser").raw({ type: "*/*" }))

app.get("*", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 8000,
    currency: 'gbp',
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: 'accept_a_payment' },
  });
  res.send({ "client_secret": paymentIntent.client_secret })
})

app.post("*", async (req, res, next) => {
  let sig = req.headers["stripe-signature"]
  try {
    let myEvent = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    console.log("success yeah")
    let recordedPayment = await CreatePayment(myEvent)
    if (!recordedPayment.error) {
      console.log('no error')
      let newLicense = await CreateLicense(recordedPayment)
      res.send(newLicense)
    }
  } catch (err) {
    res.send({"error": err})
  }
})

// or as a promise
const handler = serverless(app)
module.exports.handler = async (event, context) => {
  let myHandler = await handler(event, context)
  return myHandler
}
