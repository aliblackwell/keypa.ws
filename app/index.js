const { getStartupSettings } = require("./app/settings")
const { openSettingsWindow, openWelcomeWindow } = require("./app/windows")
const { startKeypawsScript } = require("./app/runner")
const { createStatusMenu } = require("./app/tray")
const { makeAutoLauncher } = require("./app/widgets/auto-launch-server")
const { handleAutoUpdater } = require("./app/auto-update-server")

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
readyNodeModules()
getStartupSettings(startKeypaws, showWelcomeWindow)
