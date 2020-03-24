const { spawn } = require("child_process")
const { saveSettings } = require("./settings")
const { openCatDetected, setInfo } = require("./windows")
const { showWarning, resetWarning } = require("./tray")
const { clearArray, getErrorMessage } = require("./utils")

function alertErrorMessageAndQuit(message) {
  alert(message)
  nw.App.quit()
}

let isScriptRunning = false
let childProcess

let humanTyping = false
let probableCat = false
let possibleCat = false
let possibleHuman = false
let timeouts = []
let definiteReset

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
  clearTimeout(definiteReset)
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
  }, 3000)
  timeouts.push(timeout)
}

function gotKeys(mammal) {
  definiteReset && clearTimeout(definiteReset)
  definiteReset = setTimeout(() => {
    nw.global.resetEnvironment()
  }, 5000)
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
    showWarning()
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

    childProcess.stderr.on("close", (code, signal) => {
      const m = getErrorMessage(code, signal, null, `KeyPaws has closed.`)
      alertErrorMessageAndQuit(m)
    })

    childProcess.stderr.on("data", data => {
      let error = data.toString()[0]
      const m = getErrorMessage(null, null, null, `KeyPaws exited with error message: ${error}`)
      alertErrorMessageAndQuit(m)
    })
    childProcess.on("error", error => {
      const m = getErrorMessage(null, null, error, `KeyPaws encountered an error.`)
      alertErrorMessageAndQuit(m)
    })
    childProcess.on("exit", (code, signal) => {
      const m = getErrorMessage(code, signal, null, "KeyPaws encountered a problem.")
      alertErrorMessageAndQuit(m)
    })
  })
}

function triggerAccessibilityPermission(successCb, errorCb) {
  stopScript(() => {
    childProcess = spawn("./background/keypaws/keypaws")
    isScriptRunning = true
    childProcess.on("exit", () => {
      isScriptRunning = false
    })
    childProcess.stdout.on("data", data => {
      isScriptRunning = true
      let mammal = data.toString()[0]
      successCb(mammal)
    })

    childProcess.stderr.on("close", () => {
      isScriptRunning = false
      settings.accessibilityGranted = false
      saveSettings(settings, () => {
        errorCb()
      })
    })
  })
}

function triggerAccessibilityPermissionGranted() {
  if (isScriptRunning) {
    childProcess.kill("SIGINT")
  }
  settings.accessibilityGranted = true
  saveSettings(settings, () => {
    nw.global.closeWelcomeWin()
    nw.global.startKeypaws()
  })
}

module.exports = {
  getErrorMessage,
  startKeypawsScript,
  stopScript,
  triggerAccessibilityPermission,
  triggerAccessibilityPermissionGranted,
}
