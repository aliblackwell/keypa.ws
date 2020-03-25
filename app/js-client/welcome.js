function renderPanel(slide) {
  showHideEls("hide", ".step")
  showHideEls("hide", ".should-hide")
  showHideEl("show", `.step[data-panel="panel-${slide}"]`)
}

const beginSetupButton = document.querySelector("#begin-setup")
beginSetupButton.addEventListener("click", () => renderPanel(1))

const grantPermissionButton = document.querySelector("#grant-permission")
grantPermissionButton.addEventListener("click", grantPermission)
const confirmPermissionButton = document.querySelector("#confirm-permission")
confirmPermissionButton.addEventListener("click", confirmPermission)

const checkPermissionButton = document.querySelector("#check-permission")
checkPermissionButton.addEventListener("click", () => renderPanel(1))

const shouldBeWorkingButton = document.querySelector("#should-be-working")
shouldBeWorkingButton.addEventListener("click", () => {
  renderPanel(2)
  triggerAccessibilityPermission(gotTyping, () => {
    showHideEl("show", ".check-permission")
  })
})

const finalConfirmButton = document.querySelector("#final-confirm")
finalConfirmButton.addEventListener("click", () => renderPanel(3))

const {
  triggerAccessibilityPermission,
  triggerAccessibilityPermissionGranted,
} = require("./runner.js")

const gotTyping = m => {
  let mammal = m === "c" ? "cat" : "human"
  document.querySelector(".test-prediction").innerHTML = mammal
  let testerTimeout = null
  showHideEl("show", ".confirm-step")
  clearTimeout(testerTimeout)
  testerTimeout = setTimeout(() => {
    document.querySelector(".test-prediction").innerHTML = "_____"
  }, 500)
}

function grantPermission() {
  showHideEls("show", ".more-help")
  grantPermissionButton.innerHTML = "Looking purrfect"
  renderPanel(2)
  triggerAccessibilityPermission(gotTyping, () => {
    showHideEl("show", ".check-permission")
  })
}

function confirmPermission() {
  triggerAccessibilityPermissionGranted()
}

renderPanel(0)
