function showEl(el) {
  el.classList.remove("hidden")
  el.setAttribute("aria-hidden", "false")
}

function showEls(els) {
  els.forEach(function (el) {
    showEl(el)
  })
}

function hideEl(el) {
  el.classList.add("hidden")
  el.setAttribute("aria-hidden", "true")
}

function hideEls(els) {
  els.forEach(function (el) {
    hideEl(el)
  })
}
