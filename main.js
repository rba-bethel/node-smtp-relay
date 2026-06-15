const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 25252,
  secure: false,
  tls: { rejectUnauthorized: false },
  ignoreTLS: true,
});

transporter.sendMail(
  {
    // from: '"noreply" <noreply@bethelgen.com>',
    from: "test@bethelgen.com",
    to: "rbastrolabio@bethelgen.com",
    subject: "Test Email",
    text: "Hello world!",
    html: "<b>Hello world!</b>",
  },
  (err, info) => {
    if (err) return console.error(err);
    console.log("Sent:", info.messageId);
  },
);
