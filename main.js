// const { spawn } = require("child_process")

// const child = spawn("python3", ["./tester.py"])

// child.on("exit", code => {
//   console.log(`Child process exited with code ${code}`)
// })

// child.stdout.on('data', (data) => {
//   console.log(`data:${data}`);
// });
// child.stdout.on('end', () => {
//   console.log('enf')
// });

let settingsWin, catDetectedWin
let isSettingsOpen = false
let isCatDetectedOpen = false

function openCatDetected() {
  if (!isCatDetectedOpen) {
    nw.Window.open(
      "cat-detected.html",
      {
        icon: "img/paws-menu-bar-white.png",
        always_on_top: false,
        fullscreen: true,
        show_in_taskbar: false,
        visible_on_all_workspaces: false
      },
      function(wind) {
        catDetectedWin = wind
        isCatDetectedOpen = true
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

openCatDetected()
