const { clearArray } = require("./utils")
const path = require("path")
let statusUpdates = []
let isCatDetectedOpening = false
let settingsWindowOpen = false
let infoEl = null
let a11yInfoEl = null
nw.global.endNyans = []

function gotCorrectFilePath() {
  let dir_path = path.dirname(process.execPath)
  if (dir_path.indexOf("Applications") > -1) {
    return true
  }
  return false
}

if (gotCorrectFilePath() || process.env.CONTEXT === "developmentt") {
  nw.global.gotCorrectPath = true
} else {
  nw.global.gotCorrectPath = false
}

const windowSettings = {
  width: 1200,
  height: 480,
  position: "center",
  frame: false,
  kiosk: false,
}

const cdSettings = {
  width: 10,
  height: 10,
  kiosk: true,
  visible_on_all_workspaces: true,
}

function resetInfo() {
  infoEl.innerHTML = nw.global.generateCatWithMessage(false)
}

function setInfo(words) {
  if (infoEl && a11yInfoEl) {
    a11yInfoEl.querySelector("p").innerHTML = words
    nw.global.shouldCatBlink = false
    let newCat = nw.global.generateCatWithMessage(words)
    infoEl.innerHTML = newCat
    clearArray(statusUpdates, clearTimeout)
    const clearStatus = setTimeout(() => {
      infoEl.innerHTML = nw.global.generateCatWithMessage(false)
    }, 500)
    statusUpdates.push(clearStatus)
  }
}

function setInfoEl(el, a11yEl) {
  infoEl = el
  a11yInfoEl = a11yEl
}

function openCatDetected() {
  if (!isCatDetectedOpening) {
    isCatDetectedOpening = true
    nw.Window.open("./app/cat-detected.html", cdSettings, function(win) {
      nw.global.closeCatDetected = () => {
        win.close()
      }
      win.enterKioskMode()
      win.on("close", function() {
        nw.global.closePage && nw.global.closePage.endNyan()
        this.close(true)
        this.hide()
        resetInfo()
        this.leaveKioskMode()

        isCatDetectedOpening = false
        nw.global.resetWarning()
        nw.global.resetEnvironment()
      })
    })
  }
}

function openSettingsWindow() {
  if (settingsWindowOpen) {
    nw.global.focusSettings()
  } else {
    settingsWindowOpen = true
    if (nw.global.settingsOpened) {
      nw.global.openSettings()
    } else {
      nw.Window.open("./app/settings.html", windowSettings, function(win) {
        win.setShowInTaskbar(true)
        win.leaveKioskMode()
        win.setResizable(false)

        nw.global.closeSettingsWin = () => {
          win.close()
        }

        win.on("close", function(c) {
          settingsWindowOpen = false
          this.setShowInTaskbar(false)
          this.hide()
          nw.global.settingsPage && nw.global.settingsPage.endNyan()
          nw.global.focusSettings = () => {
            this.focus()
          }

          nw.global.openSettings = () => {
            this.setShowInTaskbar(true)
            this.show()
            this.leaveKioskMode()
          }
          nw.global.settingsOpened = true
          if (c === "quit") {
            nw.App.quit()
          }
        })
      })
    }
  }
}

function endWhichNyan(pageName, endThisNyan) {
  const preservedObj = nw.global[pageName] ? nw.global[pageName] : {}
  nw.global[pageName] = Object.assign({}, preservedObj)
  nw.global[pageName].endNyan = endThisNyan
}

function openWelcomeWindow() {
  nw.Window.open("./app/welcome.html", windowSettings, function(win) {
    nw.global.closeWelcomeWin = function() {
      win.hide()
    }
  })
}

module.exports = {
  openCatDetected,
  openSettingsWindow,
  openWelcomeWindow,
  setInfo,
  setInfoEl,
  endWhichNyan,
}
