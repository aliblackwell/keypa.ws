const fs = require("fs")

const stats = fs.statSync(`./downloads/KeyPaws${process.env.VERSION_NUMBER}.dmg`)
const fileSizeInBytes = stats.size

function updateManifest() {
  const packageJSON = JSON.parse(fs.readFileSync("./downloads/package.json"))
  packageJSON.version = process.env.VERSION_NUMBER
  packageJSON.packages.mac64.size = fileSizeInBytes
  packageJSON.packages.mac64.url = `https://downloads.keypa.ws/KeyPaws${process.env.VERSION_NUMBER}.zip`
  fs.writeFile("./downloads/package.json", JSON.stringify(packageJSON, null, 2), err => {
    if (err) throw err
  })
}

function updateFileHeaders() {
  let netlifyConfig = `/KeyPaws${process.env.VERSION_NUMBER}.dmg
  Content-Type: application/octet-stream
  Content-Disposition: attachment; filename="KeyPaws${process.env.VERSION_NUMBER}.DMG"
  Content-Length: ${fileSizeInBytes} 
  `
  fs.writeFile("./downloads/_headers", netlifyConfig, err => {
    if (err) throw err
  })
}

updateManifest()
updateFileHeaders()
