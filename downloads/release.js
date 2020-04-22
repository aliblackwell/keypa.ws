const fs = require("fs")

const zipStats = fs.statSync(`./downloads/KeyPaws${process.env.VERSION_NUMBER}.zip`)
const zipSizeInBytes = zipStats.size

function updateManifest() {
  const packageJSON = JSON.parse(fs.readFileSync("./downloads/package.json"))
  packageJSON.version = process.env.VERSION_NUMBER
  packageJSON.packages.mac64.size = zipSizeInBytes
  packageJSON.packages.mac64.url = `https://downloads.keypa.ws/KeyPaws${process.env.VERSION_NUMBER}.zip`
  fs.writeFile("./downloads/package.json", JSON.stringify(packageJSON, null, 2), err => {
    if (err) throw err
  })
}

updateManifest()
