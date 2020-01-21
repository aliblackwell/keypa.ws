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

let previousFive = []

function checkPreviousFive(mammal) {
  previousFive.push(mammal)
  if (previousFive.length > 5) {
    previousFive.shift()
  }
  let c = 0
  for (let i = 0; i < previousFive.length; i++) {
    if (previousFive[i] === "c") c++
  }

  if (c >= 3) {
    setStatus("TOO MUCH CAT!!")
    openCatDetected()
  }
}

function resetEnvironment() {
  humanTyping = false
  previousFive = []
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
  checkPreviousFive(mammal)
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
      //setStatus(mammal)
      gotKeys(mammal)
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
