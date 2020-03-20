let catContainer = document.getElementsByTagName("pre")[0]
nw.global.shouldCatBlink = true
nw.global.catContainer = catContainer

let catString = nw.global.catContainer.innerHTML
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

function generateCatWithMessage(message) {
  let newCat = ""
  for (let i = 0; i < catArray.length - 15; i++) {
    if (message && (i === 12 || i === 14)) {
      newCat += "-"
    } else {
      newCat += catArray[i]
    }
  }
  if (message) {
    newCat += message
  } else {
    newCat += generateGibberish(14)
  }
  return newCat
}

nw.global.generateCatWithMessage = generateCatWithMessage

function generateCat(shouldBlink, eyesShut) {
  let newCat = ""
  let lengthOfCat = catArray.length
  for (let i = 0; i < lengthOfCat; i++) {
    if (shouldBlink && (i === 12 || i === 14)) {
      newCat += "-"
    } else {
      newCat += catArray[i]
    }
  }
  nw.global.catContainer.innerHTML = newCat
  if (shouldBlink) {
    setTimeout(() => generateCat(false), 300)
  }
  if (eyesShut) {
    return
  }
}

;(function loop() {
  var rand = Math.round(Math.random() * (9000 - 1000)) + 500
  setTimeout(function() {
    if (nw.global.shouldCatBlink) {
      generateCat(true, false)
    }
    loop()
  }, rand)
})()
