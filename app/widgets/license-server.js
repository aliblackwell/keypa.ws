const nano = require("nano")("https://db.keypa.ws:6984")
const { saveSettings } = require("../settings")
const crypto = require("crypto")

let quitTimer

function startCountdown() {
  if (!nw.global.settings.licensed) {
    quitTimer = setTimeout(function() {
      nw.App.quit()
    }, 1000 * 60 * 120) // 2 hrs later
  }
}

function checkLicense(license) {
  const secret = "abcdefg"
  const hash = crypto
    .createHmac("sha256", secret)
    .update(license)
    .digest("hex")

  const licenses = nano.use("licenses")
  licenses
    .get(hash)
    .then(() => {
      let settings = nw.global.settings
      settings.licensed = true
      saveSettings(settings, () => {
        console.log("settings updated")
        nw.global.toggleLicensePanel()
      })
      clearTimeout(quitTimer)
    })
    .catch(err => {
      console.log("No license found!")
      nw.global.showIncorrectKey()
      console.log(err)
    })
}

nw.global.checkLicense = checkLicense

module.exports = { startCountdown, checkLicense }
