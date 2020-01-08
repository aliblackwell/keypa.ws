const assert = require("assert")
const { clearArray } = require("../app/utils")

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
