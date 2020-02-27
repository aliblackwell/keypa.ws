const { clearArray } = require("./utils")
let statusUpdates = []
let isCatDetectedOpening = false
let settingsWindowOpen = false
let infoEl = null

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

const currentWords = {
  title: "nothing",
}

function updateWin(win) {
  win.currentWords = currentWords
}

function resetInfo() {
  infoEl.innerHTML = nw.global.generateCatWithMessage(false)
}

function setInfo(words) {
  if (infoEl) {
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

function setInfoEl(el) {
  infoEl = el
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
          nw.global.endNyan()

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
}
