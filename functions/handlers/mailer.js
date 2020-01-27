export async function handler(event, context, cb) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const {
    toEmail,
    toName,
    fromEmail,
    fromName,
    template,
    hashSalt,
    giftId,
    ethereumAddress,
    amount } = event.queryStringParameters;

  let {
    message
  } = event.queryStringParameters;

  console.log(message)


  let subject, c2a_button, c2a_link, recipientEmail, recipientName, ccEmail, ccName, intro, intro2, intro3;
  const urlString = `fromEmail=${fromEmail}&fromName=${fromName}&toEmail=${toEmail}&toName=${toName}&amount=${amount}&hashSalt=${hashSalt}&giftId=${giftId}`
  switch (template) {
    case 'fromGiftSend':
      recipientEmail = toEmail;
      recipientName = toName;
      ccEmail = fromEmail;
      ccName = fromName;
      subject = `${ccName} gave you some cryptocurrency`;
      intro = `Dear ${toName},`;
      intro2 = `${ccName} has sent you a gift of Ethereum cryptocurrency!\n\nYour gift is waiting for you on the Ethereum blockchain.`;
      intro3 = `We have copied ${ccName} into this email too if you’d like to thank them. We’ll help you receive it simply and quickly – just visit GiftEth by clicking the button below on a desktop computer (doesn’t work on mobile yet!):`;
      message = message ? `They sent you this message: "${message}"` : '';
      c2a_button = `Collect your gift`;
      c2a_link = `${process.env.SITE_URL}/gift?${urlString}&discover=true`;
      break;
    case 'toAddressSend':
      recipientEmail = fromEmail;
      recipientName = fromName;
      ccEmail = toEmail;
      ccName = toName
      subject = `${toName} has shared their Ethereum address with you`;
      c2a_button = 'Finalise your gift now';
      c2a_link = `${process.env.SITE_URL}/gift?${urlString}&ethereumAddress=${ethereumAddress}&finalise=true`;
      intro = `Dear ${fromName}`;
      intro2 = `${toName} has successfully set up their Ethereum account and is ready to receive your gift.`;
      intro3 = `We have cc'd them to this email if you want to double-check with them. Their address is: ${ethereumAddress}. You can now return to the giftEth site to quickly complete your gift:`;
      message = '';
      break;
    case 'fromGiftConfirm':
      recipientEmail = toEmail;
      recipientName = toName;
      ccEmail = fromEmail;
      ccName = fromName;
      subject = `${toName}\`s Ether has arrived!`;
      c2a_button = 'See the gift and how to spend it';
      c2a_link = `${process.env.SITE_URL}/gift?${urlString}&thanks=true`;
      intro = `Dear ${toName},`;
      intro2 = `You have now successfully received your gift of Ether. Thanks for using giftEth.`;
      intro3 = `Check out the site and sign up for our emails to get ideas for how to use your Ether in the wondrous world of blockchain.`;
      message = '';
      break;
    default:
      subject = event.queryStringParameters.subject || 'Email from Gifteth'
  }
  const msg = {
    personalizations: [
      {
        to: [
          {
            email: recipientEmail,
            name: recipientName
          }
        ],
        cc: [
          {
            email: ccEmail,
            name: ccName
          }
        ],

        dynamic_template_data: {
          subject: subject,
          header: subject,
          intro: intro,
          intro2: intro2,
          intro3: intro3,
          message: message,
          c2a_link: c2a_link,
          c2a_button: c2a_button,
        }
      }
    ],
    from: {
      email: 'info@gifteth.co',
      name: `${ccName} via Gifteth`,
    },
    template_id: 'd-41c6334fe32e4636b162383ec264e596'
  };
  try {
    let result = await sgMail.send(msg);
    console.log(JSON.stringify({status: "message sent successfully"}))
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'x-requested-with',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ msg: 'Success', ...result })
    }
  }

  catch(e) {
    console.log(JSON.stringify({status: "message not sent", ...e}))
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'x-requested-with',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ msg: 'Error', ...e })
    }
  }



}
