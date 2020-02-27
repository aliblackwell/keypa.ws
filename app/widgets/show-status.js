const ShowStatusHTML = `
<h2>Cat detected warning</h2>
<p class="explainer">
  The icon in your taskbar will flash if cat-like typing is detected
</p>
<div class="wrapper">
  <input class="show-status-radio" id="show-status:enabled" name="show-status" type="radio" value="show-status:enabled">
  <label for="show-status:enabled">Show warning</label>
</div>
<div class="wrapper">
  <input class="show-status-radio" id="show-status:disabled" name="show-status" type="radio" value="show-status:disabled">
  <label for="show-status:disabled">Don't show warning</label>
</div>
`

function initShowStatus() {
  let ShowStatusRadios = document.querySelectorAll(".show-status-radio")
  if (nw.global.settings["show-status"] === "enabled") {
    nw.global.setShowStatus()
  } else {
    nw.global.setHideStatus()
  }
  ShowStatusRadios.forEach(radio => {
    radio.addEventListener("click", e => {
      if (e.target.value === "show-status:enabled") {
        nw.global.setShowStatus()
      } else {
        nw.global.setHideStatus()
      }
    })
  })
}

let ShowStatusWidget = document.getElementById("show-status")
ShowStatusWidget.innerHTML = ShowStatusHTML
initShowStatus()
