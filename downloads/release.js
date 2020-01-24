const fs = require("fs")

const dmgStats = fs.statSync(`./downloads/KeyPaws${process.env.VERSION_NUMBER}.dmg`)
const zipStats = fs.statSync(`./downloads/KeyPaws${process.env.VERSION_NUMBER}.zip`)
const dmgSizeInBytes = dmgStats.size
const zipSizeInBytes = zipStats.size

function updateManifest() {
  const packageJSON = JSON.parse(fs.readFileSync("./downloads/package.json"))
  packageJSON.version = process.env.VERSION_NUMBER
  packageJSON.packages.mac64.size = dmgSizeInBytes
  packageJSON.packages.mac64.url = `https://downloads.keypa.ws/KeyPaws${process.env.VERSION_NUMBER}.zip`
  fs.writeFile("./downloads/package.json", JSON.stringify(packageJSON, null, 2), err => {
    if (err) throw err
  })
}

function updateFileHeaders() {
  let netlifyConfig = `/KeyPaws${process.env.VERSION_NUMBER}.dmg
  Content-Type: application/octet-stream
  Content-Disposition: attachment; filename="KeyPaws${process.env.VERSION_NUMBER}.dmg"
  Content-Length: ${dmgSizeInBytes}
  Cache-Control: max-age=31556926
/KeyPaws${process.env.VERSION_NUMBER}.zip
  Content-Type: application/octet-stream
  Content-Disposition: attachment; filename="KeyPaws${process.env.VERSION_NUMBER}.zip"
  Content-Length: ${zipSizeInBytes}
  Cache-Control: max-age=31556926
  `
  fs.writeFile("./downloads/_headers", netlifyConfig, err => {
    if (err) throw err
  })
}

updateManifest()
updateFileHeaders()
