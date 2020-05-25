const express = require("express")
const serverless = require("serverless-http")
const app = express()

const stripeSecret = process.env.CONTEXT === 'production' ? process.env.STRIPE_SECRET_KEY_LIVE : process.env.STRIPE_SECRET_KEY
const stripeSigningSecret = process.env.CONTEXT === 'production' ? process.env.STRIPE_SIGNING_SECRET_LIVE : process.env.STRIPE_SIGNING_SECRET


const stripe = require("stripe")(`${stripeSecret}`)
const endpointSecret = `${stripeSigningSecret}`
const cors = require("cors")
const { CreateAndStoreLicenseHash } = require("./handlers/create-license-hash.js");
const { CreatePayment } = require("./handlers/create-payment.js");
const { SendEmailReceipt } = require(". /handlers/mailer.js");
app.use(cors())
app.use(require("body-parser").raw({ type: "*/*" }))

app.get("*", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 800,
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
    let paymentReceipt = await CreatePayment(myEvent)
    await CreateAndStoreLicenseHash(paymentReceipt)
    let emailReceipt = await SendEmailReceipt(paymentReceipt, myEvent.data.object.client_secret)
    res.send(emailReceipt)
  } catch (err) {
    console.log(err)
    res.send({})
  }
})

// or as a promise
const handler = serverless(app)
module.exports.handler = async (event, context) => {
  let myHandler = await handler(event, context)
  return myHandler
}
