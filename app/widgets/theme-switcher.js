const body = document.getElementsByTagName("body")[0]
const ThemeSwitcherWidget = document.getElementById("theme-switcher")

function getSystemTheme() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches // could change on mac auto
  return isDarkMode ? "dark" : "light"
}

function getCurrentTheme() {
  let settings = nw.global.settings
  const currentPalette = settings.palette
  if (!currentPalette || currentPalette === "dark" || currentPalette === "light") {
    settings.palette = getSystemTheme()
  }
  if (!settings.theme) {
    settings.theme = "default"
  }
  if (settings.theme === "nyan") {
    console.log("initting nyan")
    nw.global.initNyan()
  } else {
    nw.global.endNyan()
  }

  // if (settings.theme === "default") {
  //   nw.global.endNyan()
  // }
  nw.global.saveSettings(settings, () => console.log("settings saved"))
}

const classes = [
  { slug: "default", name: "Default" },
  { slug: "nyan", name: "Nyan Cat" },
]

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
      for (let i = 0; i < classes.length; i++) {
        body.classList.remove(classes[i].slug)
      }
      const currentTheme = e.target.value.split(":")[1]
      body.classList.add(currentTheme)
      if (currentTheme === "nyan") {
        nw.global.initNyan()
      }
    })
  })
}

function switchStyles() {
  body.classList.add(nw.global.settings.palette)
  if (nw.global.settings.theme === "nyan") {
    body.classList.add("nyan")
    body.classList.remove("light")
    body.classList.add("dark")
  } else {
    body.classList.add(nw.global.settings.theme)
  }
}

if (ThemeSwitcherWidget) {
  ThemeSwitcherWidget.innerHTML = ThemeSwitcherHTML
  initThemeSwitcherSettings()
}
getCurrentTheme()
switchStyles()
