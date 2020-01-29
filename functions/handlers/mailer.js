export async function handler(event, context, cb) {
  const sgMail = require("@sendgrid/mail")

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const { toEmail, downloadLink } = event.queryStringParameters

  let { message } = event.queryStringParameters

  const msg = {
    personalizations: [
      {
        to: [
          {
            email: toEmail
          },
        ],
        dynamic_template_data: {
          subject: 'Download KeyPaws',
          c2a_link: downloadLink,
        },
      },
    ],
    from: {
      email: "miaow@keypa.ws",
      name: `KeyPaws`,
    },
    template_id: "d-18c1261a990040578e953506c0cd0a53",
  }
  try {
    let result = await sgMail.send(msg)
    console.log(JSON.stringify({ status: "message sent successfully" }))
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "x-requested-with",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ msg: "Success", ...result }),
    }
  } catch (e) {
    console.log(JSON.stringify({ status: "message not sent", ...e }))
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "x-requested-with",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ msg: "Error", ...e }),
    }
  }
}
