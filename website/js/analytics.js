function sendAnalyticsEvent(endpoint) {
  const post = {
    endpoint: endpoint
  }
  fetch("https://www.keypa.ws/.functions/analytics/" + endpoint, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data)
    })
    .catch(error => {
      console.error("Error:", error)
    })
}

function setAnalyticsHandlers() {
  const els = document.querySelectorAll("[data-analytics]")
  els &&
    els.forEach(el => {
      console.log(el)
      el.addEventListener("click", evt => {
        evt.preventDefault()
        let eventType = el.getAttribute("data-analytics")
        sendAnalyticsEvent(eventType)
      })
    })
}

setAnalyticsHandlers()
