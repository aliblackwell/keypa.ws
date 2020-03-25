/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[sS]howHideEl" }]*/

function showHideEl(state, selector) {
  let el = document.querySelector(selector)
  if (state === "show") {
    el.setAttribute("aria-hidden", "false")
    el.classList.remove("hidden")
  } else {
    el.setAttribute("aria-hidden", "true")
    el.classList.add("hidden")
  }
}

function showHideEls(state, selector) {
  let els = document.querySelectorAll(selector)
  els.forEach(el => {
    if (state === "show") {
      el.setAttribute("aria-hidden", "false")
      el.classList.remove("hidden")
    } else {
      el.setAttribute("aria-hidden", "true")
      el.classList.add("hidden")
    }
  })
}
