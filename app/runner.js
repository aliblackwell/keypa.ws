const { spawn } = require("child_process")
const {openCatDetected} = require('./windows.js')

let isTriggerRunning = false
let childProcess;


function startKeypawsScript() {
  const childProcess = spawn("./background/keypaws/keypaws")
  childProcess.stdout.on("data", data => {
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
      console.log(signal)
      isTriggerRunning = false
    })
    childProcess.stdout.on("data", data => {
      isTriggerRunning = true
      console.log(data.toString())
    })
  }
}

function triggerAccessibilityPermissionGranted() {
  if (isTriggerRunning) {
    childProcess.kill("SIGINT")
  }
  settings.accessibilityGranted = true
  saveSettings(settings, () => {
    nw.global.closeWelcomeWin()
    nw.global.startKeypaws()
  })
}

module.exports = {
  startKeypawsScript,
  triggerAccessibilityPermission,
  triggerAccessibilityPermissionGranted
}
