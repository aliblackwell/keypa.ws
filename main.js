let settingsWin;
let isSettingsOpen = false


function openSettings() {
  if (!isSettingsOpen) {
    nw.Window.open(
      "settings.html",
      {
        icon: "assets/paws-menu-bar-white.png",
        show_in_taskbar: true
      },
      function (win) {
        settingsWin = win
        isSettingsOpen = true
        settingsWin.on("close", function () {
          settingsWin.hide()
          isSettingsOpen = false
        })
      }
    )
  } else {
    settingsWin.show()
    settingsWin.restore()
    isSettingsOpen = true
  }
}

// Create a tray icon
var tray = new nw.Tray({ title: "", icon: "assets/paws-menu-bar-white.png" })

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

openSettings()