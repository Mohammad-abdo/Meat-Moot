const nodemailer = require("nodemailer"); // Make sure to import nodemailer at the beginning of your script.

const sendEmail = async (Options) => {
  // 1- create a transporter
  await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
   
    host: process.env.EMAIL_HOST,

      port: process.env.EMAIL_PORT,
  
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
// ============== another way ===========
    // host: 'smtp.ethereal.email',
    // port: 587,
    // auth: {
    //     user: 'corene17@ethereal.email',
    //     pass: 'QYHjbaydGSHsYthRfw'
    // }
  });
  

  // 2- Define the Email Options
  const mailOptions = {
    // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    // to: "mohamed@gmail.com", // list of receivers
    // subject: "Hello ✔"+Options.subject, // Subject line
    // text: "Hello world?"+ Options.message, // plain text body
    // html: "<b>Hello world?</b>", // html body
    from: "mohamed Abdo <sdm800884@gmail.com>",
    to:Options.email, // Corrected the closing angle bracket.
    // to:Options.email, // Corrected the closing angle bracket.
    subject: Options.subject,
    text: Options.message,
  };
  // await transporter.sendMail(mailOptions)
  try {
    await transporter.sendMail(mailOptions);
    console.log("seccess");
  } catch (error) {
    console.log("faild",error);
  } // Corrected variable name to "mailOptions".

  // 3- Actively Send Email
};


module.exports = sendEmail;
