const fs = require("fs")
const path = require("path")

nw.global.settings = ""

const defaultSettings = {
  accessibilityGranted: false,
  mood: "friendly",
  mode: "active",
  theme: "default",
}

const settingsFile = "my-settings-file65.json"
const settingsPath = path.join(nw.App.dataPath, settingsFile)

function getStartupSettings(handleRegular, handleFirstTime) {
  fs.readFile(settingsPath, (err, data) => {
    if (err) {
      setDefaultSettings(err, handleFirstTime)
      return false
    }
    const settings = JSON.parse(data)
    checkAccessibilityGranted(settings, handleRegular, handleFirstTime)
  })
}

function checkAccessibilityGranted(s, handleRegular, handleFirstTime) {
  nw.global.settings = s
  if (s.accessibilityGranted) {
    handleRegular()
  } else {
    handleFirstTime()
  }
}

function setDefaultSettings(err, handleFirstTime) {
  saveSettings(defaultSettings, function() {
    handleFirstTime()
  })
}

function saveSettings(s, callback) {
  fs.writeFile(settingsPath, JSON.stringify(s), function(err) {
    if (err) {
      console.info("There was an error attempting to save your data.")
      console.warn(err.message)
      return
    } else if (callback) {
      nw.global.settings = s
      callback()
    }
  })
}
nw.global.saveSettings = saveSettings
module.exports = { getStartupSettings, saveSettings }
