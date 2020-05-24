const crypto = require("crypto")
const nano = require('nano')(`https://aliblackwell:${process.env.KEYPAWS_BACKEND_PASSWORD}@db.keypa.ws:6984`);

async function CreateAndStoreLicenseHash(paymentReceipt) {
  console.log('inserting license')
  try {
    const licenseDb = nano.db.use('licenses')
    const secret = "abcdefg"
    const hash = crypto
      .createHmac("sha256", secret)
      .update(paymentReceipt.license)
      .digest("hex")

    const document = {
      "_id": hash
    }

    return await licenseDb.insert(document)
  }

  catch (err) {
    throw err
  }


}



module.exports = { CreateAndStoreLicenseHash }
