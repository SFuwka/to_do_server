const nodemailer = require("nodemailer");


const user = process.env.MAILER_USER;
const pass = process.env.MAILER_PASS;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass,
    },
});

const sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log("Check");
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=${process.env.SERVER_URL}/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};


module.exports = sendConfirmationEmail