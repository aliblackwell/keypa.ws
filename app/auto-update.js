const AutoUpdateHTML = `
<div id="app-version">KeyPaws v. ${nw.App.manifest.version}</div>
<div id="auto-update-status"></div>`

const AutoUpdateOutput = document.querySelector("#auto-update")
let AutoUpdateStatus

async function main() {
  AutoUpdateStatus = document.querySelector("#auto-update-status")
  try {
    // Download/unpack update if any available
    const rManifest = await nw.global.updater.readRemoteManifest()
    const needsUpdate = await nw.global.updater.checkNewVersion(rManifest)
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
    nw.global.updater.on("download", (downloadSize, totalSize) => {
      AutoUpdateStatus.innerHTML = `Downloading... progress: ${Math.floor(
        (downloadSize / totalSize) * 100
      )}%`
    })
    nw.global.updater.on("install", (installFiles, totalFiles) => {
      AutoUpdateStatus.innerHTML = `Installing... progress: ${Math.floor(
        (installFiles / totalFiles) * 100
      )} %`
    })

    const updateFile = await nw.global.updater.download(rManifest)
    await nw.global.updater.unpack(updateFile)
    alert(`KeyPaws will automatically restart to finish installing the update`)
    await nw.global.updater.restartToSwap()
  } catch (e) {
    console.error(e)
  }
}

AutoUpdateOutput.innerHTML = AutoUpdateHTML

main()
