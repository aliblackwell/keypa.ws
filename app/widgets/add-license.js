const AddLicenseHTML = `
<h2>License key</h2>
<p class="explainer license-explainer">Without a license key, KeyPaws will quit without warning after 2 hours.</p>
<form id="license-form">
  <label for="license-key">Enter your license key</label>
  <input id="license-key" name="license-key" type="text" />
  <button class="smaller">Unlock KeyPaws</button>
  <a class="button smaller" href="https://www.keypa.ws/get">Get your key</a>
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
  if (licenseForm) {
    licenseForm.addEventListener("submit", evt => {
      let license = evt.target[0].value
      nw.global.checkLicense(license)
    })
  }
}

let AddLicenseWidget = document.getElementById("add-license")
AddLicenseWidget.innerHTML = AddLicenseHTML
nw.global.toggleLicensePanel()
initAddLicense()
