const nodemailer = require("nodemailer");
const { forgotPassword } = require("../routes/auth/controllers/login");


const user = process.env.MAILER_USER;
const pass = process.env.MAILER_PASS;


const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: user,
        pass: pass,
    },
});

const sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <div>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=${process.env.SERVER_URL}/api/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};

const sendForgotPasswordEmail = (email, name, forgotPasswordCode) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: "Reset password",
        html: `<h1>Reset password</h1>
        <h2>Hello ${name}</h2>
        <div>
        <p>To reset your password please click on the following link</p>
        <a href=${process.env.SERVER_URL}/api/login/confirmReset/${forgotPasswordCode}> Click here</a>
        </div>`,
    }).catch(err => console.log(err))
}


module.exports = { sendConfirmationEmail, sendForgotPasswordEmail }