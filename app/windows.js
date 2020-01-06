const windowSettings = {
  show_in_taskbar: false,
  width: 1200,
  height: 480,
  position: "center",
}

let isCatDetectedOpen = false
let settingsWin, catDetectedWin, welcomeWin
let isSettingsOpen = false
let isWelcomeOpen = false
nw.global.catDetectedWin = ""

function hideTaskbar() {
  // TODO
  //var win = nw.Window.get()
}

function openCatDetected() {
  if (!isCatDetectedOpen) {
    nw.Window.open(
      "./app/cat-detected.html",
      {
        visible_on_all_workspaces: true,
        show_in_taskbar: false,
        position: "center",
      },
      function(wind) {
        wind.focus()
        wind.show()
        wind.enterKioskMode()
        catDetectedWin = wind
        nw.global.catDetectedWin = wind
        isCatDetectedOpen = true
        catDetectedWin.on("close", function() {
          closeCatDetected()
        })
      }
    )
  }
}

function closeCatDetected() {
  catDetectedWin.close(true)
  isCatDetectedOpen = false
  closeSettingsWin()
}

function closeSettingsWin() {
  settingsWin.hide()
  isSettingsOpen = false
}

function closeWelcomeWin() {
  welcomeWin.hide()
  isWelcomeOpen = false
}

nw.global.closeWelcomeWin = closeWelcomeWin

function openSettingsWindow() {
  if (!isSettingsOpen) {
    nw.Window.open("./app/settings.html", windowSettings, function(win) {
      hideTaskbar()
      settingsWin = win
      isSettingsOpen = true
      settingsWin.leaveKioskMode()
      settingsWin.on("close", function() {
        closeSettingsWin()
      })
    })
  } else {
    settingsWin.show()
    settingsWin.restore()
    isSettingsOpen = true
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
