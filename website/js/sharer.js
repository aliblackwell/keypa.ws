
let sharer = document.querySelectorAll(".share-section ul")

sharer && sharer.forEach(el => el.classList.add("hidden"))

const sharers = document.querySelectorAll('.sharer-button')
sharers && sharers.forEach(sharer => {
  sharer.addEventListener('click', (evt) => {
    sharePage(evt.target.nextElementSibling)
  })
})


function sharePage(sharer) {

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

 