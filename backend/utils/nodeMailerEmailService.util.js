const nodemailer = require("nodemailer");

const nodeMailerEmailService = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });

    const info = await transporter.sendMail({
      from: `"seekFi" <${process.env.MY_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.error("email Error", error);
    throw error;
  }
};

module.exports = nodeMailerEmailService;
