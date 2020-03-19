function clearArray(arr, clearMethod) {
  for (let i = 0; i < arr.length; i++) {
    clearMethod(arr[i])
    arr.splice(i, 1)
    i--
  }
}

function getErrorMessage(code, signal, error, message) {
  let errorMessage = !message ? "KeyPaws needs to quit." : message
  if (code) {
    errorMessage += ` The error code is: ${code}.`
  }
  if (signal) {
    errorMessage += ` The signal that closed KeyPaws was called: ${signal}.`
  }
  if (error) {
    errorMessage += ` ${error.name}.`
    if (error.fileName) {
      errorMessage += ` File name: ${error.fileName}.`
    }
    if (error.lineNumber) {
      errorMessage += ` Line number: ${error.lineNumber}.`
    }
    if (error.message) {
      errorMessage += ` Message: ${error.message}.`
    }
  }
  errorMessage += " Please copy this error message and email it to Ali: miaow@keypa.ws"
  return errorMessage
}

module.exports = { clearArray, getErrorMessage }
