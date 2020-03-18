let catContainer = document.getElementsByTagName("pre")[0]
//let catTail = document.getElementsByTagName("pre")[1]
let shouldCatBlink = true

let catString = catContainer.innerHTML
let catArray = catString.split("")


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
  catContainer.innerHTML = newCat
  if (shouldBlink) {
    setTimeout(() => generateCat(false), 300)
  }
  if(eyesShut) {
    return
  }
}

function setLoadingCat() {
  generateCat(false, true)
}

function setLoadedCat() {
  generateCat(false, false)
}

;(function loop() {
  var rand = Math.round(Math.random() * (9000 - 1000)) + 500
  setTimeout(function() {
    if (shouldCatBlink) {
      generateCat(true, false)
    }
    loop()
  }, rand)
})()
