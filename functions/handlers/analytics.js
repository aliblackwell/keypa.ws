const fetch = require("isomorphic-fetch")
const btoa = require("btoa")
const { AnalyticsNotification } = require("./mailer")

function LogEvent(req, res) {
  const isDev = !req.body.hostName.includes("www")
  !isDev && AnalyticsNotification(req.body.eventType)
  const db = isDev ? "dev-analytics" : "analytics"
  res.send('success')
  fetch(`https://db.keypa.ws:6984/${db}/`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Basic " + btoa(`aliblackwell:${process.env.KEYPAWS_BACKEND_PASSWORD}`),
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(req.body),
  }).catch(err => {
      console.log("err", err)
      res.send(err)
    })
}

module.exports = { LogEvent }
