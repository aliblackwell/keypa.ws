const { spawn } = require("child_process")
const { openCatDetected, closeWelcomeWin } = require("./windows.js")

let isTriggerRunning = false
let isScriptRunning = false
let childProcess

function stopScript(callback) {
  if (isScriptRunning) {
    childProcess.kill("SIGINT")
  }
  callback()
}

function startKeypawsScript() {
  childProcess = spawn("./background/keypaws/keypaws")
  childProcess.stdout.on("data", data => {
    isScriptRunning = true
    let mammal = data.toString()[0]
    if (mammal === "c") {
      openCatDetected()
    }
  })
}

function triggerAccessibilityPermission() {
  if (!isTriggerRunning) {
    childProcess = spawn("./background/trigger/trigger")
    childProcess.on("exit", (code, signal) => {
      isTriggerRunning = false
    })
    childProcess.stdout.on("data", data => {
      isTriggerRunning = true
    })
  }
}

function triggerAccessibilityPermissionGranted() {
  if (isTriggerRunning) {
    childProcess.kill("SIGINT")
  }
  settings.accessibilityGranted = true
  saveSettings(settings, () => {
    closeWelcomeWin()
    nw.global.startKeypaws()
  })
}

module.exports = {
  startKeypawsScript,
  stopScript,
  triggerAccessibilityPermission,
  triggerAccessibilityPermissionGranted
}
