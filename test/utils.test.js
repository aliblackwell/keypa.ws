const assert = require("assert")
const { clearArray, getErrorMessage } = require("../app/utils")

describe("clearArray", () => {
  let statusUpdates = []
  let returnedUpdates = []

  beforeEach(done => {
    for (let i = 0; i < 4; i++) {
      let timer = setTimeout(() => {
        returnedUpdates.push(i)
      }, 250)
      statusUpdates.push(timer)
    }
    setTimeout(done, 200)
  })

  it("should clear an array of timeouts", () => {
    clearArray(statusUpdates, clearTimeout)
    assert.equal(statusUpdates.length, 0)
    assert.equal(returnedUpdates.length, 0)
  })
})

describe("getErrorMessage", () => {
  it("should output a default error message", () => {
    const m = getErrorMessage()
    assert.equal(
      m,
      "KeyPaws needs to quit. Please copy this error message and email it to Ali: miaow@keypa.ws"
    )
  })
  it("should ignore null code and signal args", () => {
    const m = getErrorMessage(null, null, null, "The app is on fire!")
    assert.equal(
      m,
      "The app is on fire! Please copy this error message and email it to Ali: miaow@keypa.ws"
    )
  })
  it("should display error code", () => {
    const m = getErrorMessage(42, null, null, "The app is on fire!")
    assert.equal(
      m,
      "The app is on fire! The error code is: 42. Please copy this error message and email it to Ali: miaow@keypa.ws"
    )
  })
  it("should display signal", () => {
    const m = getErrorMessage(null, "rogue signal", null, "The app is on fire!")
    assert.equal(
      m,
      "The app is on fire! The signal that closed KeyPaws was called: rogue signal. Please copy this error message and email it to Ali: miaow@keypa.ws"
    )
  })

  it("should handle a formal error", () => {
    let e = new Error()
    const m = getErrorMessage(null, null, e, "The app is on fire!")
    assert.equal(
      m,
      "The app is on fire! Error. Please copy this error message and email it to Ali: miaow@keypa.ws"
    )
  })
})
