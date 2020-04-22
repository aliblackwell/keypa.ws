const { getStartupSettings } = require("./app/settings")
const { openSettingsWindow, openWelcomeWindow } = require("./app/windows")
const { startKeypawsScript } = require("./app/runner")
const { createStatusMenu } = require("./app/tray")
const { makeAutoLauncher } = require("./app/widgets/auto-launch-server")
const { startCountdown } = require("./app/widgets/license-server")
const { handleAutoUpdater } = require("./app/auto-update-server")
const path = require("path")
function gotCorrectFilePath() {
  let dir_path = path.dirname(process.execPath)
  if (dir_path.indexOf("Applications") > -1) {
    return true
  }
  return false
}

if (gotCorrectFilePath() || process.env.CONTEXT === "development") {
  nw.global.gotCorrectPath = true
} else {
  nw.global.gotCorrectPath = false
}

function readyNodeModules() {
  makeAutoLauncher()
  handleAutoUpdater()
}

function showWelcomeWindow() {
  createStatusMenu("welcome")
  openWelcomeWindow()
}

function startKeypaws() {
  createStatusMenu("normal")
  startKeypawsScript()
  openSettingsWindow()
}

nw.global.startKeypaws = startKeypaws

// Run the app:

startCountdown()
readyNodeModules()
getStartupSettings(startKeypaws, showWelcomeWindow)
