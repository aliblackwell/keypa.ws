const { getStartupSettings } = require("./app/settings")
const { openSettingsWindow, openWelcomeWindow } = require("./app/windows")
const { startKeypawsScript } = require("./app/runner")
const { createStatusMenu } = require("./app/tray")

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
getStartupSettings(startKeypaws, showWelcomeWindow)
