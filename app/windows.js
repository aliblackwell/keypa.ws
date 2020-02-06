const windowSettings = {
  width: 1200,
  height: 480,
  position: "center",
  kiosk: false,
}

let isCatDetectedOpening = false

function openCatDetected() {
  if (!isCatDetectedOpening) {
    isCatDetectedOpening = true
    nw.Window.open(
      "./app/cat-detected.html",
      {
        visible_on_all_workspaces: true,
        position: "center",
      },
      function(win) {
        win.focus()
        win.show()
        win.enterKioskMode()
        nw.global.closeCatDetected = function() {
          isCatDetectedOpening = false
          win.close()
          win.hide()
          win.leaveKioskMode()
          win.close(true)
          win = null
          nw.global.resetWarning()
          nw.global.resetEnvironment()
        }
      }
    )
  }
}

function openSettingsWindow() {
  if (nw.global.settingsOpened) {
    nw.global.openSettings()
  } else {
    nw.Window.open("./app/settings.html", windowSettings, function(win) {
      win.setShowInTaskbar(true)
      win.on("closed", function() {
        // only used at very end, probably not necessary
        win = null
      })
      win.on("close", function(c) {
        this.setShowInTaskbar(false)
        this.hide()
        nw.global.openSettings = () => {
          this.setShowInTaskbar(true)
          this.show()
        }
        nw.global.settingsOpened = true
        if (c === "quit") {
          nw.App.quit()
        }
      })
    })
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
}
