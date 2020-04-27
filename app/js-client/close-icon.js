let closeSettings = document.querySelector("#settings-close")
closeSettings &&
  closeSettings.addEventListener("click", () => {
    nw.global.closeSettingsWin()
  })
let closeWelcome = document.querySelector("#welcome-close")
closeWelcome &&
  closeWelcome.addEventListener("click", () => {
    nw.App.quit()
  })

closeSettings && closeSettings.classList.add(nw.global.os)
closeWelcome && closeWelcome.classList.add(nw.global.os)
