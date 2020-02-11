function getSystemTheme() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches // could change on mac auto
  return isDarkMode ? "dark" : "light"
}

function checkMode() {
  var mode = getSystemTheme()
  var body = document.getElementsByTagName("body")[0]
  if (mode === "light") {    
    body.classList.remove("dark")
    body.classList.add("light")
  } else {
    body.classList.remove("light")
    body.classList.add("dark")
  }
}

checkMode()


window.matchMedia("(prefers-color-scheme: dark)").addListener(checkMode)