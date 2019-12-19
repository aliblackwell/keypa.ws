const fs = require("fs");
const path = require("path")
const { spawn } = require("child_process")

const settingsFile = 'my-settings-file29.json';
const settingsPath = path.join(nw.App.dataPath, settingsFile);

const windowSettings = {
  show_in_taskbar: false,
  width: 1200,
  height: 480,
  position: "center"
}

console.log(nw.global)

const defaultSettings = {
  accessibilityGranted: false,
  mood: 'friendly',
  mode: 'active',
  palette: 'default'
};


let settingsWin, catDetectedWin, welcomeWin, childProcess
let isSettingsOpen = false
let isWelcomeOpen = false
let isCatDetectedOpen = false
let isTriggerRunning = false
nw.global.catDetectedWin = ''
nw.global.settings = ''

function startApp(callback) {
  getSettings(checkAccessibilityGranted, setDefaultSettings)
}

function getSettings(handleSuccess, handleError) {
  fs.readFile(settingsPath, (err, data) => {
    if (err) {
      handleError(err)
      return false
    }
    const settings = JSON.parse(data)
    handleSuccess(settings)
  })
}

function checkAccessibilityGranted(s) {
  nw.global.settings = s
  if (s.accessibilityGranted) {
    startKeypaws()
  } else {
    showWelcomeWindow();
  }
}

function setDefaultSettings() {
  
  saveSettings(defaultSettings, function () {
    showWelcomeWindow()
  });
}

function saveSettings(s, callback) {

  fs.writeFile(settingsPath, JSON.stringify(s), function (err) {
    if (err) {
      console.info("There was an error attempting to save your data.");
      console.warn(err.message);
      return;
    } else if (callback) {
      nw.global.settings = s
      callback();
    }
  });
}






function showWelcomeWindow() {
  nw.Window.open(
    "./app/welcome.html",
    windowSettings,
    function (win) {
      welcomeWin = win
      isWelcomeOpen = true
      welcomeWin.on("close", function () {

      })
    }
  )
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

function openCatDetected() {
  if (!isCatDetectedOpen) {
    nw.Window.open(
      "./app/cat-detected.html",
      {
        visible_on_all_workspaces: true,
        show_in_taskbar: false
      },
      function (wind) {
        wind.focus()
        wind.show()
        wind.enterKioskMode()
        catDetectedWin = wind
        nw.global.catDetectedWin = wind
        isCatDetectedOpen = true
        catDetectedWin.on("close", function () {
          closeCatDetected()
        })
      }
    )
  }
}

function hideTaskbar() {
  var win = nw.Window.get();
  console.log(win.zoomLevel)

}


function openSettings() {
  if (!isSettingsOpen) {

    nw.Window.open(
      "./app/settings.html",
      windowSettings,
      function (win) {
        hideTaskbar()
        settingsWin = win
        isSettingsOpen = true
        settingsWin.leaveKioskMode()
        settingsWin.on("close", function () {
          closeSettingsWin()
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
var tray = new nw.Tray({ title: "", icon: "./app/assets/paws-menu-bar-white.png" })

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

// const { spawn } = require("child_process")
// const childProcess = spawn("./background/keypaws/keypaws")

// childProcess.stdout.on("data", data => {
//   openCatDetected()
// })

//openSettings()


function triggerAccessibilityPermission() {
  if (!isTriggerRunning) {
    childProcess = spawn("./background/trigger/trigger")
    childProcess.on("exit", (code, signal) => {
      console.log(signal)
      isTriggerRunning = false
    })
    childProcess.stdout.on("data", data => {
      isTriggerRunning = true
      console.log(data.toString())
    })
  }

}

function triggerAccessibilityPermissionGranted() {
  alert('here')
  if (isTriggerRunning) {
    childProcess.kill('SIGINT')
  }
  alert(settings.accessibilityGranted)
  settings.accessibilityGranted = true
  saveSettings(settings, function () {
    closeWelcomeWin()
    startKeypaws()
  })

}

function startKeypawsScript() {
  const childProcess = spawn("./background/keypaws/keypaws")
  childProcess.stdout.on("data", data => {
    let mammal = data.toString()[0]
    if (mammal === 'c') {
      openCatDetected()
    }

  })
}

function startKeypaws() {
  startKeypawsScript()
  openSettings()
}



startApp(() => console.log('app started'))