const { spawn } = require("child_process")
const { saveSettings } = require("./settings")
const { openCatDetected, setInfo } = require("./windows")
const { showWarning, resetWarning } = require("./tray")
const { clearArray } = require("./utils")

let isTriggerRunning = false
let isScriptRunning = false
let childProcess

let humanTyping = false
let probableCat = false
let possibleCat = false
let possibleHuman = false
let timeouts = []

let previousKeys = []

function checkPreviousKeys(mammal) {
  previousKeys.push(mammal)
  if (previousKeys.length > 7) {
    previousKeys.shift()
  }
  let c = 0
  for (let i = 0; i < previousKeys.length; i++) {
    if (previousKeys[i] === "c") c++
  }

  if (c >= 3) {
    setInfo("TOO MUCH CAT!!")
    openCatDetected()
  }
}

function resetEnvironment() {
  humanTyping = false
  previousKeys = []
  possibleHuman = false
  possibleCat = false
  probableCat = false
  resetWarning()
  setInfo("nothing typing")
  setTimeout(() => {
    nw.global.shouldCatBlink = true
  }, 1500)
}

nw.global.resetEnvironment = resetEnvironment

function startTimeout() {
  humanTyping = true
  possibleHuman = false
  possibleCat = false
  probableCat = false
  resetWarning()
  clearArray(timeouts, clearTimeout)
  const timeout = setTimeout(() => {
    resetEnvironment()
  }, 2000)
  timeouts.push(timeout)
}

function gotKeys(mammal) {
  checkPreviousKeys(mammal)
  if (mammal === "h" && !humanTyping && !possibleCat) {
    humanTyping = true
    possibleCat = true
    setInfo("human possible cat")
    return
  }

  if (mammal === "h" && humanTyping && possibleCat) {
    startTimeout()
    setInfo("human probable human")
    return
  }

  if (mammal === "c" && humanTyping) {
    setInfo("cat probable human")
    startTimeout()
    return
  }

  if (mammal === "c" && !humanTyping && probableCat) {
    setInfo("CAT DEFINITE CAT")
    openCatDetected()
    return
  }

  if (mammal === "c" && !humanTyping && possibleHuman) {
    setInfo("cat probable cat")
    probableCat = true
    return
  }

  if (mammal === "c") {
    setInfo("cat possible human")
    possibleHuman = true
    showWarning()
    return
  }
}

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
      gotKeys(mammal)
    })

    childProcess.stderr.on("close", () => {
      alert(
        `KeyPaws exited with error message: "closed". Please inform Ali of the error message via email: miaow@keypa.ws`
      )
      nw.App.quit()
    })

    childProcess.stderr.on("data", data => {
      let error = data.toString()[0]
      alert(
        `KeyPaws exited with error message: "${error}". Please inform Ali of the error message via email: miaow@keypa.ws`
      )
      nw.App.quit()
    })
    childProcess.on("error", code => {
      alert(
        `KeyPaws exited with code "${code}". Please inform Ali of the error code via email: miaow@keypa.ws`
      )
      nw.App.quit()
    })
    childProcess.on("exit", code => {
      console.log(`KeyPaws exited with code ${code}`)
      alert(
        "KeyPaws encountered a problem and has to quit. If this was unintentional, please open the app again from your Applications folder."
      )
      nw.App.quit()
    })
  })
}

function startRecordScript(mammal) {
  stopScript(() => {
    childProcess = spawn("./background/keypaws/record", [mammal, `"${nw.App.dataPath}"`])
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
    childProcess.on("exit", () => {
      isTriggerRunning = false
    })
    childProcess.stdout.on("data", () => {
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
    nw.global.closeWelcomeWin()
    nw.global.startKeypaws()
  })
}

module.exports = {
  startKeypawsScript,
  startRecordScript,
  stopScript,
  triggerAccessibilityPermission,
  triggerAccessibilityPermissionGranted,
}
