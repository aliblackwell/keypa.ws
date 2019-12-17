const fs = require("fs");
const path = require("path")
const { spawn } = require("child_process")

const settingsFile = 'my-settings-file.json';
const settingsPath = path.join(nw.App.dataPath, settingsFile);

let settingsWin, catDetectedWin, welcomeWin, childProcess, settings
let isSettingsOpen = false
let isWelcomeOpen = false
let isCatDetectedOpen = false
nw.global.catDetectedWin = ''


function checkSettings(callback) {
  fs.readFile(settingsPath, (err, data) => {
    if (err) {
      loadFirstRun()
      return callback(err)
    }
    const settings = JSON.parse(data)
    handleSettings(settings)
    callback('Loaded settings')
  })
}

function handleSettings(s) {
  settings = s
  if (settings.accessibilityGranted) {
    startKeypaws()
  } else {
    showWelcomeWindow();
  }
}

function saveSettings(settings, callback) {

  fs.writeFile(settingsPath, JSON.stringify(settings), function (err) {
    if (err) {
      console.info("There was an error attempting to save your data.");
      console.warn(err.message);
      return;
    } else if (callback) {
      callback();
    }
  });
}


checkSettings(r => console.log(r))

function loadFirstRun() {
  console.log('first run woo!')
  const mySettings = {
    "accessibilityGranted": false,
    "theme": "dark"
  };
  saveSettings(mySettings, function () {
    console.log('Settings saved');
    showWelcomeWindow()
  });
}

function showWelcomeWindow() {
  nw.Window.open(
    "./app/welcome.html",
    {
      icon: "./app/assets/paws-menu-bar-white.png",
      show_in_taskbar: true
    },
    function (win) {
      welcomeWin = win
      isWelcomeOpen = true

      welcomeWin.leaveKioskMode()
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

function openCatDetected() {
  if (!isCatDetectedOpen) {
    nw.Window.open(
      "./app/cat-detected.html",
      {
        icon: "assets/paws-menu-bar-white.png",
        visible_on_all_workspaces: true
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
function openSettings() {
  if (!isSettingsOpen) {

    nw.Window.open(
      "./app/settings.html",
      {
        icon: "./app/assets/paws-menu-bar-white.png",
        show_in_taskbar: true
      },
      function (win) {
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
  childProcess = spawn("./background/keypaws/keypaws")
}

function triggerAccessibilityPermissionGranted() {
  childProcess.kill('SIGINT')
  settings.accessibilityGranted = true
  saveSettings(settings, function () {
    startKeypaws()
  })

}

function startKeypawsScript() {
  const childProcess = spawn("./background/keypaws/keypaws")
  childProcess.stdout.on("data", data => {
    openCatDetected()
  })
}

function startKeypaws() {
  startKeypawsScript()
  openSettings()
}