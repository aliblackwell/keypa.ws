const { spawn } = require("child_process")
const { saveSettings } = require("./settings")
const { openCatDetected, closeWelcomeWin } = require("./windows")
const { showWarning, resetWarning, setStatus } = require("./tray")
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
  if (previousKeys.length > 4) {
    previousKeys.shift()
  }
  let c = 0
  for (let i = 0; i < previousKeys.length; i++) {
    if (previousKeys[i] === "c") c++
  }

  if (c >= 2) {
    setStatus("TOO MUCH CAT!!")
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
  setStatus("nothing typing")
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
    setStatus("human possible cat")
    return
  }

  if (mammal === "h" && humanTyping && possibleCat) {
    humanTyping = true
    possibleCat = false
    setStatus("human probable human")
    return
  }

  if (mammal === "h" && humanTyping && !possibleCat) {
    setStatus("human definite human")
    startTimeout()
    return
  }

  if (mammal === "c" && humanTyping) {
    setStatus("cat definite human")
    startTimeout()
    return
  }

  // if (mammal === "c" && humanTyping && possibleCat) {
  //   openCatDetected()
  // }

  if (mammal === "c" && !humanTyping && probableCat) {
    setStatus("CAT DEFINITE CAT")
    openCatDetected()
    return
  }

  if (mammal === "c" && !humanTyping && possibleHuman) {
    setStatus("probable cat")
    probableCat = true
    return
  }

  if (mammal === "c" && !humanTyping) {
    setStatus("cat possible human")
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
    closeWelcomeWin()
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
