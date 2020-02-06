const AddLicenseHTML = `
<form id="license-form">
  <label for="license-key">Enter your license key</label>
  <div class="inline-form">
  <input id="license-key" name="license-key" type="text" />
  <button class="inline-smaller">Unlock</button>
  </div>
  <p class="explainer license-explainer">Without a license key, <strong>KeyPaws</strong> will <strong>quit without warning</strong> after 2 hours.</p>
  <button class="smaller" id="get-key">Get your key</a>
</form>
`
let autoLaunch = document.querySelector("#auto-launch")
let addLicense = document.querySelector("#add-license")

function toggleLicensePanel() {
  if (!nw.global.settings.licensed) {
    autoLaunch.style.display = "none"
    addLicense.style.display = "block"
  } else {
    addLicense.style.display = "none"
    autoLaunch.style.display = "block"
  }
}
nw.global.toggleLicensePanel = toggleLicensePanel

function initAddLicense() {
  const licenseForm = document.querySelector("#license-form")
  licenseForm &&
    licenseForm.addEventListener("submit", evt => {
      let license = evt.target[0].value
      nw.global.checkLicense(license)
    })
  const getKey = document.querySelector("#get-key")
  getKey &&
    getKey.addEventListener("click", () => {
      nw.Shell.openExternal("https://www.keypa.ws/get")
    })
}

let AddLicenseWidget = document.getElementById("add-license")
AddLicenseWidget.innerHTML = AddLicenseHTML
nw.global.toggleLicensePanel()
initAddLicense()