let settingsWin, catDetectedWin
let isSettingsOpen = false
let isCatDetectedOpen = false
nw.global.catDetectedWin = ''

function closeCatDetected() {
  catDetectedWin.leaveKioskMode()
  catDetectedWin.close(true)
  isCatDetectedOpen = false
}

function openCatDetected() {
  console.log('trying to open!')
  if (!isCatDetectedOpen) {
    nw.Window.open(
      "cat-detected.html",
      {
        icon: "img/paws-menu-bar-white.png",
        always_on_top: false,
        show_in_taskbar: false,
        visible_on_all_workspaces: true
      },
      function(wind) {
        wind.focus()
        wind.enterKioskMode()
        catDetectedWin = wind
        nw.global.catDetectedWin = wind
        isCatDetectedOpen = true
        catDetectedWin.on("close", function() {
          catDetectedWin.hide()
          isCatDetectedOpen = false
        })
      }
    )
  }
}

function openSettings() {
  if (!isSettingsOpen) {
    nw.Window.open(
      "settings.html",
      {
        icon: "img/paws-menu-bar-white.png",
        always_on_top: false,
        fullscreen: false,
        show_in_taskbar: false,
        visible_on_all_workspaces: false
      },
      function(win) {
        settingsWin = win
        isSettingsOpen = true
        settingsWin.on("close", function() {
          settingsWin.hide()
          isSettingsOpen = false
        })
      }
    )
  }
}

// Create a tray icon
var tray = new nw.Tray({ title: "", icon: "img/paws-menu-bar-white.png" })

// Give it a menu
var menu = new nw.Menu()

let menuItemOpenSettings = new nw.MenuItem({
  type: "normal",
  label: "Settings"
})
menuItemOpenSettings.on("click", () => {
  openSettings()
})
let menuItemQuit = new nw.MenuItem({ type: "normal", label: "Quit KeyPaws" })
menuItemQuit.on("click", () => {
  nw.App.quit()
})
menu.append(menuItemOpenSettings)
menu.append(menuItemQuit)
tray.menu = menu

const { spawn } = require("child_process")
const childProcess = spawn("./listener/dist/keypaws")

childProcess.stdout.on("data", data => {
  openCatDetected()
})

openSettings()