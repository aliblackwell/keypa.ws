const fetch = require("isomorphic-fetch")

function LogDownload(req, res) {

  const document = {
    timestamp: Date.now(),
    source: req.url
  }

  fetch(`https://db.keypa.ws:6984/downloads/`, {
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

module.exports = { LogDownload }