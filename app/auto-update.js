const AutoUpdateHTML = `
<div id="app-version"><p class="text-small">KeyPaws v. ${nw.App.manifest.version}</p></div>
<div id="auto-update-status"></div>`

const AutoUpdateOutput = document.querySelector("#auto-update")
let downloadUrl
let AutoUpdateStatus

function getUpdate() {
  nw.Shell.openExternal(downloadUrl)
}

nw.global.getUpdate = getUpdate // only for eslint :(

async function checkUpdates() {
  AutoUpdateStatus = document.querySelector("#auto-update-status")
  try {
    // Download/unpack update if any available
    const rManifest = await nw.global.updater.readRemoteManifest()
    const needsUpdate = await nw.global.updater.checkNewVersion(rManifest)
    if (!needsUpdate) {
      AutoUpdateStatus.innerHTML = `<p class="text-small">App is up to date.</p>`
      return
    }
    if (needsUpdate) {
      downloadUrl = rManifest.packages.mac64.url

      AutoUpdateStatus.innerHTML = `<button class="smaller" onclick="getUpdate()">Update KeyPaws</button>`
      return
    }
  } catch (e) {
    console.error(e)
  }
}

nw.global.checkUpdates = checkUpdates

AutoUpdateOutput.innerHTML = AutoUpdateHTML

checkUpdates()
