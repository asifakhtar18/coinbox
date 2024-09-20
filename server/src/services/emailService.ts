const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailService = async (to: string, subject: string, html: string) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    text: "",
    html: html,
  });

  return info;
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    console.log("Email sent to: ", to);
    const info = await emailService(to, subject, html);
    console.log("Email sent to: ", to);
    return info;
  } catch (e) {
    console.log("Error: ", e);

    return e;
  }
};

export default sendEmail;
