/*global currentPageNyanInstance*/

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

let sharer = document.querySelector(".share-section ul")
sharer && sharer.classList.add("hidden")


function sharePage() {
  let isVisible = sharer.classList.contains("hidden")
  let links = document.querySelectorAll(".share-link")
  if (isVisible) {
    sharer.setAttribute("aria-hidden", false)

    for (let i = 0; i < links.length; i++) {
      links[i].setAttribute("tabindex", 0)
    }
  } else {
    sharer.setAttribute("aria-hidden", true)
    for (let i = 0; i < links.length; i++) {
      links[i].setAttribute("tabindex", -1)
    }
  }
  sharer.classList.toggle("hidden")
}