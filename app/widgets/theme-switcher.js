const body = document.getElementsByTagName("body")[0]
const ThemeSwitcherWidget = document.getElementById("theme-switcher")

const classes = [
  { slug: "dark", name: "Dark" },
  { slug: "light", name: "Light" },
  { slug: "nyan", name: "Nyan Cat" },
]

const ThemeSwitcherHTML = `<h3>Theme</h3>
<p class="explainer">
  KeyPaws runs best when you train it on your own keyboard use. You can also train it on your cat:
</p>${classes
  .map(
    cls => `<div class="wrapper">
  <input class="theme-switcher-radio" id="theme:${cls.slug}" name="theme" type="radio" value="theme:${cls.slug}">
  <label for="theme:${cls.slug}">${cls.name}</label>
  </div>`
  )
  .join(" ")}`

function initThemeSwitcherSettings() {
  let ThemeSwitcherRadios = document.querySelectorAll(".theme-switcher-radio")
  ThemeSwitcherRadios.forEach(radio => {
    radio.addEventListener("click", e => {
      for (let i = 0; i < classes.length; i++) {
        body.classList.remove(classes[i].slug)
      }
      body.classList.add(e.target.value.split(":")[1])
    })
  })
}

function switchStyles() {
  body.classList.add(nw.global.settings.theme)
}

if (ThemeSwitcherWidget) {
  ThemeSwitcherWidget.innerHTML = ThemeSwitcherHTML
  initThemeSwitcherSettings()
}

switchStyles()
