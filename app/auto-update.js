const AutoUpdateHTML = `
<div id="app-version">KeyPaws v. ${nw.App.manifest.version}</div>
<div id="auto-update-status"></div>
`

const AutoUpdater = require("nw-autoupdater"),
  updater = new AutoUpdater(require("../package.json"), {
    strategy: "ScriptSwap",
  }),
  AutoUpdateOutput = document.querySelector("#auto-update")
let AutoUpdateStatus

async function main() {
  AutoUpdateStatus = document.querySelector("#auto-update-status")
  try {
    // Download/unpack update if any available
    const rManifest = await updater.readRemoteManifest()
    const needsUpdate = await updater.checkNewVersion(rManifest)
    if (!needsUpdate) {
      AutoUpdateStatus.innerHTML = `App is up to date.`
      return
    }
    if (!confirm("New release is available. Do you want to upgrade?")) {
      AutoUpdateStatus.innerHTML = `Update available. <button onclick="main()">Update</button>`
      return
    } else {
      AutoUpdateStatus.innerHTML = `Downloading`
    }

    // Subscribe for progress events
    updater.on("download", (downloadSize, totalSize) => {
      AutoUpdateStatus.innerHTML = `Downloading... progress: ${Math.floor(
        (downloadSize / totalSize) * 100
      )}%`
    })
    updater.on("install", (installFiles, totalFiles) => {
      AutoUpdateStatus.innerHTML = `Installing... progress: ${Math.floor(
        (installFiles / totalFiles) * 100
      )} %`
    })

    const updateFile = await updater.download(rManifest)
    await updater.unpack(updateFile)
    alert(`KeyPaws will automatically restart to finish installing the update`)
    await updater.restartToSwap()
  } catch (e) {
    console.error(e)
  }
}

AutoUpdateOutput.innerHTML = AutoUpdateHTML

main()
