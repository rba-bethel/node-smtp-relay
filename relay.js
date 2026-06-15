const nodemailer = require("nodemailer");
const SMTPServer = require("smtp-server").SMTPServer;
const { simpleParser } = require("mailparser");

// SMTP server that relays incoming mail via SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.HOST || "smtp-mail.outlook.com",
  port: Number(process.env.PORT || 587),
  secure: process.env.SECURE === "1",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const server = new SMTPServer({
  secure: false,
  authOptional: true,
  onData(stream, session, callback) {
    simpleParser(stream, {}, async (err, parsed) => {
      if (err) {
        console.error("[PARSE ERROR]", err);
        return callback(err);
      }

      console.log("--- Incoming Message ---");
      console.log("From:", parsed.from?.text);
      console.log("To:", parsed.to?.text);
      console.log("Subject:", parsed.subject);
      console.log("Attachments:", parsed.attachments?.length || 0);

      try {
        const info = await transporter.sendMail({
          from: parsed.from?.text,
          to: parsed.to?.text,
          subject: parsed.subject,
          text: parsed.text,
          html: parsed.html,
          attachments: parsed.attachments,
        });

        console.log("[RELAYED OK]", {
          messageId: info.messageId,
          accepted: info.accepted,
          rejected: info.rejected,
          response: info.response,
        });

        callback();
      } catch (e) {
        console.error("[RELAY FAILED]", {
          message: e.message,
          code: e.code,
          responseCode: e.responseCode,
          response: e.response,
          from: parsed.from?.text,
          to: parsed.to?.text,
        });
        callback(e);
      }
    });
  },
  onMailFrom(address, session, callback) {
    callback();
  },
  onRcptTo(address, session, callback) {
    callback();
  },
});

server.listen(25252, () => {
  console.log("SMTP relay listening on port 25252");
  console.log(`USER: ${process.env.USER}`);
});
