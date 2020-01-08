const { openSettingsWindow } = require("./windows")
const { clearArray } = require("./utils")
let warningIntervals = []
let current = "white"
let statusUpdates = []
// Create a tray icon
let tray = new nw.Tray({
  title: "",
  icon: "./app/assets/paws-menu-bar-white.png",
})

function setStatus(words) {
  tray.title = words
  clearArray(statusUpdates, clearTimeout)
  const clearStatus = setTimeout(() => (tray.title = ""), 500)
  statusUpdates.push(clearStatus)
}

function showWarning() {
  const warningInterval = setInterval(() => {
    tray.icon = `./app/assets/paws-menu-bar-${current}.png`
    if (current === "white") {
      current = "invert"
    } else {
      current = "white"
    }
  }, 333)
  warningIntervals.push(warningInterval)
}

function resetWarning() {
  warningIntervals.forEach(warning => clearInterval(warning))
  warningIntervals = []
}

function createStatusMenu(format) {
  // Give it a menu
  var menu = new nw.Menu()

  if (format === "normal") {
    let menuItemOpenSettings = new nw.MenuItem({
      type: "normal",
      label: "Settings",
    })
    menuItemOpenSettings.on("click", () => {
      openSettingsWindow()
    })
    menu.append(menuItemOpenSettings)
  }

  let menuItemQuit = new nw.MenuItem({ type: "normal", label: "Quit KeyPaws" })
  menuItemQuit.on("click", () => {
    nw.App.quit()
  })

  menu.append(menuItemQuit)
  tray.menu = menu
}

module.exports = { createStatusMenu, showWarning, resetWarning, setStatus }
