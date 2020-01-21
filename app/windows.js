const windowSettings = {
  width: 1200,
  height: 480,
  position: "center",
  kiosk: false,
}

let isCatDetectedOpen = false
let settingsWin, welcomeWin, catDetectedWin
let isSettingsHidden = false
let isWelcomeOpen = false

function openCatDetected() {
  if (!isCatDetectedOpen) {
    nw.Window.open("./app/cat-detected.html", windowSettings, function(wind) {
      catDetectedWin = wind
      wind.focus()
      wind.show()
      wind.enterKioskMode()
      isCatDetectedOpen = true
      wind.on("close", function() {
        console.log("closing!")
        wind.close(true)
        console.log("closed")
      })
    })
  }
}

function closeCatDetected() {
  catDetectedWin.close()
  catDetectedWin.hide()
  catDetectedWin.leaveKioskMode()
  isCatDetectedOpen = false
  catDetectedWin.close(true)
  closeSettingsWin()
  nw.global.resetWarning()
  nw.global.resetEnvironment()
}

function closeSettingsWin() {
  settingsWin.hide()
  isSettingsHidden = true
  settingsWin.setShowInTaskbar(false)
}

function closeWelcomeWin() {
  welcomeWin.hide()
  isWelcomeOpen = false
}

nw.global.closeWelcomeWin = closeWelcomeWin

function openSettingsWindow() {
  if (!isSettingsHidden) {
    nw.Window.open("./app/settings.html", windowSettings, function(win) {
      console.log("opening new window")
      settingsWin = win
      isSettingsHidden = false
      settingsWin.setShowInTaskbar(true)
      settingsWin.leaveKioskMode()
      settingsWin.on("close", function() {
        closeSettingsWin()
      })
    })
  } else {
    console.log("opening same window")
    isSettingsHidden = false
    settingsWin.show()
    settingsWin.restore()
    settingsWin.leaveKioskMode()
    settingsWin.setShowInTaskbar(true)
  }
}

function openWelcomeWindow() {
  nw.Window.open("./app/welcome.html", windowSettings, function(win) {
    welcomeWin = win
    isWelcomeOpen = true
    isWelcomeOpen && welcomeWin.on("close", function() {})
  })
}

module.exports = {
  openCatDetected,
  closeCatDetected,
  openSettingsWindow,
  openWelcomeWindow,
  closeWelcomeWin,
}
