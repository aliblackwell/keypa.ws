const AddLicenseHTML = `
<form id="license-form">
  <label for="license-key">Enter your license key</label>
  <div class="inline-form">
  <input id="license-key" name="license-key" type="text" />
  <button class="inline-smaller">Unlock</button>
  </div>
  <p class="explainer license-explainer">Without a license key, <strong>KeyPaws</strong> will <strong>quit without warning</strong> after 2 hours.</p>
</form>
<button class="smaller" id="get-key">Get your key</a>
`

function toggleLicensePanel() {
  if (!nw.global.settings.licensed) {
    showHideEl("hide", "#auto-launch")
    showHideEl("show", "#add-license")
  } else {
    showHideEl("show", "#auto-launch")
    showHideEl("hide", "#add-license")
  }
}
nw.global.toggleLicensePanel = toggleLicensePanel

function showIncorrectKey() {
  let licenseExplainer = document.querySelector(".license-explainer")
  licenseExplainer.innerHTML =
    'Please check your key and try again, or contact <strong><a href="mailto:miaow@keypa.ws">miaow@keypa.ws</a></strong>'
}

function resetErrorMessage() {
  let licenseExplainer = document.querySelector(".license-explainer")
  licenseExplainer.innerHTML =
    "Without a license key, <strong>KeyPaws</strong> will <strong>quit without warning</strong> after 2 hours."
}

nw.global.resetErrorMessage = resetErrorMessage

nw.global.showIncorrectKey = showIncorrectKey

function initAddLicense() {
  const licenseForm = document.querySelector("#license-form")
  licenseForm &&
    licenseForm.addEventListener("submit", evt => {
      evt.preventDefault()
      let license = evt.target[0].value
      nw.global.checkLicense(license)
    })
  const getKey = document.querySelector("#get-key")
  getKey &&
    getKey.addEventListener("click", () => {
      nw.Shell.openExternal("https://www.keypa.ws/download-mac")
    })
}

let AddLicenseWidget = document.getElementById("add-license")
AddLicenseWidget.innerHTML = AddLicenseHTML
nw.global.toggleLicensePanel()
initAddLicense()
