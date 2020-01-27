const fetch = require("isomorphic-fetch")
const btoa = require("btoa")

function CreateLicense(event, res) {
  fetch(`https://offchain-dbs01.commit-me.com:6984/licenses/`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Basic " + btoa(`keypaws-backend:${process.env.KEYPAWS_BACKEND_PASSWORD}`),
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(event),
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
