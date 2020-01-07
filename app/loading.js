const { saveSettings } = require("./settings")
let radios = document.querySelectorAll('input[type="radio"]')
let radioWrappers = document.querySelectorAll(".wrapper")
let interval1, interval2
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
  let newCat = generateCat()
  cat.innerHTML = newCat
  interval1 = setInterval(() => {
    loading = !loading
  }, 250)
  interval2 = setInterval(() => {
    let newCat = generateCat()
    cat.innerHTML = newCat
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
  clearInterval(interval2)
  radioWrappers.forEach(el => {
    el.children[0].removeAttribute("disabled")
    el.classList.remove("disabled")
  })
  setTimeout(() => {
    let newCat = generateCat()
    cat.innerHTML = newCat
  }, 500)
}

let cat = document.getElementsByTagName("pre")[0]
let loading = false
let catString = cat.innerHTML
let catArray = catString.split("")

function generateGibberish(length) {
  var result = ""
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!!!!@@@@@@£££££$$$$%%%%^^^^&&&&****(((())))++++_____))>>>???<<<""":::~~~//****---````~~~~"'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function generateCat() {
  let newCat = ""
  for (let i = 0; i < catArray.length - 18; i++) {
    if (loading && (i === 12 || i === 14)) {
      newCat += "-"
    } else {
      newCat += catArray[i]
    }
  }
  if (loading) {
    newCat += "Saving_settings__"
    newCat[12] = "o"
    newCat[14] = "o"
  } else {
    newCat += generateGibberish(17)
  }
  return newCat
}

cat.innerHTML = generateCat()
