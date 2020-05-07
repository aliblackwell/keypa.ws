const nano = require('nano')(`https://aliblackwell:${process.env.KEYPAWS_BACKEND_PASSWORD}@db.keypa.ws:6984`);

async function CreatePayment(event) {

  const paymentDb = nano.db.use('payments')

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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
    return document.license
  }
  catch (error) {
    throw error
  }

}

module.exports = { CreatePayment }