const fs = require("fs")

const dmgStats = fs.statSync(`./downloads/KeyPaws${process.env.VERSION_NUMBER}.dmg`)
const dmgSizeInBytes = dmgStats.size

function updateManifest() {
  const packageJSON = JSON.parse(fs.readFileSync("./downloads/package.json"))
  packageJSON.version = process.env.VERSION_NUMBER
  packageJSON.packages.mac64.size = dmgSizeInBytes
  packageJSON.packages.mac64.url = `https://keypaws.b-cdn.net/KeyPaws${process.env.VERSION_NUMBER}.zip`
  fs.writeFile("./downloads/package.json", JSON.stringify(packageJSON, null, 2), err => {
    if (err) throw err
  })
}

updateManifest()
