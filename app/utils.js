function clearArray(arr, clearMethod) {
  for (let i = 0; i < arr.length; i++) {
    clearMethod(arr[i])
    arr.splice(i, 1)
    i--
  }
}

module.exports = { clearArray }
