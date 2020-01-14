var AutoLaunch = require("auto-launch")

function makeAutoLauncher() {
  nw.global.keyPawsAutoLauncher = new AutoLaunch({
    name: "KeyPaws",
    path: "/Applictions/KeyPaws.app",
  })
}

module.exports = { makeAutoLauncher }
