const autoLaunchHTML = `
<h3>Startup</h3>
<p class="explainer">
  Set it and forget it
</p>
<div class="wrapper">
  <input class="auto-launch-radio" id="auto-launch:enabled" name="auto-launch" type="radio" value="auto-launch:enabled">
  <label for="auto-launch:enabled">Launch at startup</label>
</div>
<div class="wrapper">
  <input class="auto-launch-radio" id="auto-launch:disabled" name="auto-launch" type="radio" value="auto-launch:disabled">
  <label for="auto-launch:disabled">Don't launch at startup</label>
</div>
`

function init() {
  let autoLaunchRadios = document.querySelectorAll(".auto-launch-radio")
  autoLaunchRadios.forEach(radio => {
    radio.addEventListener("click", e => {
      if (e.target.value === "auto-launch:enabled") {
        nw.global.keyPawsAutoLauncher.enable().then(d => console.log(d))
      } else {
        nw.global.keyPawsAutoLauncher.disable().then(d => console.log(d))
      }
    })
  })
}

let AutoLaunchWidget = document.getElementById("auto-launch")
AutoLaunchWidget.innerHTML = autoLaunchHTML
init()
