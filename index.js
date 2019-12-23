const { getStartupSettings } = require("./app/settings")
const { openSettingsWindow } = require("./app/windows")
const { startKeypawsScript } = require("./app/runner")
const { createStatusMenu } = require("./app/tray")

function showWelcomeWindow() {
  createStatusMenu("welcome")
  nw.Window.open("./app/welcome.html", windowSettings, function(win) {
    welcomeWin = win
    isWelcomeOpen = true
    welcomeWin.on("close", function() {})
  })
}

function startKeypaws() {
  createStatusMenu("normal")
  startKeypawsScript()
  openSettingsWindow()
}

nw.global.startKeypaws = startKeypaws

// Run the app:
getStartupSettings(startKeypaws, showWelcomeWindow)
