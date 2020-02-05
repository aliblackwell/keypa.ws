const fetch = require("isomorphic-fetch")
const crypto = require("crypto")
const btoa = require("btoa")

function CreateLicense(event, res) {

  const secret = "abcdefg"
  const hash = crypto
    .createHmac("sha256", secret)
    .update('magiclicense')
    .digest("hex")

  const document = {
    "id": hash
  }


  fetch(`https://db.keypa.ws:6984/licenses/`, {
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
    body: JSON.stringify(document),
  })
    .then(response => response.json())
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log("err", err)
      res.send(err)
    })
}

module.exports = { CreateLicense }
