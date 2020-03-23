const body = document.getElementsByTagName("body")[0]
const ThemeSwitcherWidget = document.getElementById("theme-switcher")

function getSystemTheme() {
  const media = window.matchMedia("(prefers-color-scheme: dark)")
  const isDarkMode = media ? media.matches : null
  return isDarkMode ? "dark" : "light"
}

const classes = [
  { slug: "default", name: "Default" },
  { slug: "nyan", name: "Nyan Cat" },
]

function setNewTheme(theme) {
  let settings = nw.global.settings
  settings.theme = theme
  nw.global.saveSettings(settings, () => {
    nw.global.setCurrentTheme()
  })
}

function setCurrentTheme() {
  let settings = nw.global.settings
  const currentPalette = settings.palette
  if (!currentPalette || currentPalette === "dark" || currentPalette === "light") {
    settings.palette = getSystemTheme()
  }
  if (settings.theme === "nyan") {
    body.classList.remove("light")
    body.classList.remove("dark")
    currentPageNyanInstance.initNyan()
  } else {
    currentPageNyanInstance.endNyan()
    for (let i = 0; i < classes.length; i++) {
      body.classList.remove(classes[i].slug)
    }
    body.classList.remove("light")
    body.classList.remove("dark")
    body.classList.add(settings.palette)
  }
}

const ThemeSwitcherHTML = `<h2>Theme</h2>
<p class="explainer">
  It' got to be Nyan Cat!
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
      const currentTheme = e.target.value.split(":")[1]
      setNewTheme(currentTheme)
    })
  })
}

if (ThemeSwitcherWidget) {
  ThemeSwitcherWidget.innerHTML = ThemeSwitcherHTML
  initThemeSwitcherSettings()
}
setCurrentTheme()

window.matchMedia("(prefers-color-scheme: dark)").addListener(setCurrentTheme)
