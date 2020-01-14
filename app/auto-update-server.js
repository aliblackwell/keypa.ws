const AutoUpdater = require("nw-autoupdater")

function handleAutoUpdater() {
  nw.global.updater = new AutoUpdater(require("../package.json"), {
    strategy: "ScriptSwap",
  })
}

module.exports = { handleAutoUpdater }
