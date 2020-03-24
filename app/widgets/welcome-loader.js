function getSystemTheme() {
  const media = window.matchMedia("(prefers-color-scheme: dark)")
  const isDarkMode = media ? media.matches : null
  return isDarkMode ? "dark" : "light"
}

function displayApp() {
  let settings = nw.global.settings
  const currentPalette = settings.palette
  if (!currentPalette || currentPalette === "dark" || currentPalette === "light") {
    settings.palette = getSystemTheme()
  }

  body.classList.add(settings.palette)
}

displayApp()

window.matchMedia("(prefers-color-scheme: dark)").addListener(displayApp)
