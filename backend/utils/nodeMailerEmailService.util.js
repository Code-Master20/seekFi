const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const nodeMailerEmailService = async ({ to, subject, text, html }) => {
  try {
    const accessTokenResponse = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MY_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessTokenResponse.token,
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
