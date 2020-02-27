const { saveSettings } = require("./settings")
let radios = document.querySelectorAll('input[type="radio"]')
let radioWrappers = document.querySelectorAll(".wrapper")
let interval1, interval2
let loading = false
radios.forEach(function(elem) {
  // Lookup key in settings
  let key = elem.value.split(":")[0]
  let value = elem.value.split(":")[1]
  if (nw.global.settings[key] === value) {
    elem.setAttribute("checked", true)
  }
  elem.addEventListener("click", function(e) {
    let settingsDetails = e.target.value.split(":")
    let settingsKey = settingsDetails[0]
    let settingsValue = settingsDetails[1]
    setLoading(settingsValue)
    const newSettings = nw.global.settings
    newSettings[settingsKey] = settingsValue
    saveSettings(newSettings, () => {
      setTimeout(setLoaded, 500)
    })
  })
})

function setLoading(clicked) {
  loading = true
  interval1 = setInterval(() => {
    loading = !loading
  }, 250)
  radioWrappers.forEach(el => {
    el.children[0].setAttribute("disabled", true)
    if (el.children[0].value.split(":")[1] != clicked) {
      el.classList.add("disabled")
    }
  })
}

function setLoaded() {
  loading = false
  clearInterval(interval1)
  radioWrappers.forEach(el => {
    el.children[0].removeAttribute("disabled")
    el.classList.remove("disabled")
  })
}
