// Create a tray icon
let tray = new nw.Tray({
  title: "",
  icon: "./app/assets/paws-menu-bar-white.png"
})

function createStatusMenu(format) {
  // Give it a menu
  var menu = new nw.Menu()

  if (format === "normal") {
    let menuItemOpenSettings = new nw.MenuItem({
      type: "normal",
      label: "Settings"
    })
    menuItemOpenSettings.on("click", () => {
      openSettings()
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

module.exports = { createStatusMenu }