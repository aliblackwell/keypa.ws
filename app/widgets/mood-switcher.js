const MoodSwitcherWidget = document.getElementById("mood-switcher")
const MoodSwitcherHTML = `<h3>Mood</h3>
  <p class="explainer">
    What happens when kitty steps on your keys? An engaging game to keep them entertained, or a scary screen to
    keep them at bay? The choice is yours:
  </p>
  <div class="wrapper">
    <input class="mood-switcher-radio" id="mood:friendly" name="mood" type="radio" value="mood:friendly">
    <label for="mood:friendly">Friendly</label>
  </div>
  <div class="wrapper">
    <input class="mood-switcher-radio" id="mood:hostile" name="mood" type="radio" value="mood:hostile">
    <label for="mood:hostile">Hostile</label>
  </div>`

function initMoodSwitcherSettings() {
  let MoodSwitcherRadios = document.querySelectorAll(".mood-switcher-radio")
  MoodSwitcherRadios.forEach(radio => {
    radio.addEventListener("click", () => {
      console.log("mood switched!")
    })
  })
}
MoodSwitcherWidget.innerHTML = MoodSwitcherHTML
initMoodSwitcherSettings()
