function sendAnalyticsEvent(eventType, callback) {
  const event = {
    type: eventType,
    timestamp: Date.now(),
    url: window.location.pathname,
    navigator: navigator.userAgent,
    language: navigator.language,
    hostName: window.location.hostname,
  }

  fetch("/.netlify/functions/analytics/", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data)
      callback()
    })
    .catch(error => {
      console.error("Error:", error)
      callback()
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
        sendAnalyticsEvent(eventType, () => {
          window.location = el.getAttribute("href")
        })
      })
    })
}

setAnalyticsHandlers()
