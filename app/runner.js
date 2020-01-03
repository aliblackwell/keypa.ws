const { spawn } = require("child_process")
const {saveSettings} = require("./settings")
const { openCatDetected, closeWelcomeWin } = require("./windows")

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
  stopScript(() => {
    childProcess = spawn("./background/keypaws/keypaws")
    childProcess.stdout.on("data", data => {
      isScriptRunning = true
      let mammal = data.toString()[0]
      if (mammal === "c") {
        openCatDetected()
      }
    })
  })

}

function startRecordScript(mammal) {
  stopScript(() => {
    childProcess = spawn('./background/keypaws/record', [mammal, `"${nw.App.dataPath}"`])
    childProcess.stdout.on("data", data => {
      isScriptRunning = true
      let output = data.toString()[0]
      console.log(output)
    })
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
  startRecordScript,
  stopScript,
  triggerAccessibilityPermission,
  triggerAccessibilityPermissionGranted
}
