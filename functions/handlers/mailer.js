async function AnalyticsNotification(event_type) {
  const sgMail = require("@sendgrid/mail")
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    personalizations: [
      {
        to: [
          {
            email: "miaow@keypa.ws",
          },
        ],
        dynamic_template_data: {
          first_para: "There has been a new " + event_type + ' on the KeyPaws website.',
          final_para: "That's all folks :)",
          preheader: "New" + event_type + " on the KeyPaws website",
          subject: "New " + event_type,
          c2a_link: "https://analytics.keypa.ws",
          c2a_text: "View Analytics",
        },
      },
    ],
    from: {
      email: "miaow@keypa.ws",
      name: `KeyPaws`,
    },
    template_id: "d-e5616d03914d46b4955b57eb74d2fc40",
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

async function handler(event, context, cb) {
  const sgMail = require("@sendgrid/mail")

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const { toEmail, downloadLink } = event.queryStringParameters

  let { message } = event.queryStringParameters

  const msg = {
    personalizations: [
      {
        to: [
          {
            email: toEmail,
          },
        ],
        dynamic_template_data: {
          subject: "Download KeyPaws",
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

module.exports = { handler, AnalyticsNotification }
