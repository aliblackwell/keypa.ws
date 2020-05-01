const crypto = require("crypto")
const nano = require('nano')(`https://aliblackwell:${process.env.KEYPAWS_BACKEND_PASSWORD}@db.keypa.ws:6984`);

async function CreateLicense(recordedPayment) {
  const licenseDb = nano.db.use('licenses')
  const secret = "abcdefg"
  const hash = crypto
    .createHmac("sha256", secret)
    .update(recordedPayment.license)
    .digest("hex")

  const document = {
    "_id": hash
  }

  return await licenseDb.insert(document)
 
}



module.exports = { CreateLicense }
