import * as nodemailer from  "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async(email: string) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "fh2.0@hotmail.com", // generated ethereal user
      pass: "87328054", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });


  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"On The Table" <fh2.0@hotmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<div>teste</div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


}

export const sendChangePassword = async(email: string) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "fh2.0@hotmail.com", // generated ethereal user
      pass: "87328054", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });


  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"On The Table" <fh2.0@hotmail.com>', // sender address
    to: email, // list of receivers
    subject: "Senha alterada", // Subject line
    text: "Hello world?", // plain text body
    html: `<div>teste</div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


}

export const sendPassword = async(email: string, code: string) => {
  console.log('email')
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // console.log(testAccount)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "fh2.0@hotmail.com", // generated ethereal user
      pass: "87328054", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  console.log(transporter)

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"On The Table" <fh2.0@hotmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<div>${code}</div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


}

