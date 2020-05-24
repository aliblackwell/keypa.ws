const nano = require('nano')(`https://aliblackwell:${process.env.KEYPAWS_BACKEND_PASSWORD}@db.keypa.ws:6984`);

async function CreatePayment(event) {

  console.log('creating payment')
  const paymentDb = nano.db.use('payments')

  function uuidv4() {
    return 'Kxx_Exx_Yxx_Pxx_Axx_Wxx_Sxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const document = {
    "_id": event.data.object.client_secret,
    "event": event,
    "license": uuidv4()
  }
  try {
    await paymentDb.insert(document)
    return document
  }
  catch (error) {
    throw error
  }

}

module.exports = { CreatePayment }