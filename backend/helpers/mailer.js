const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oauth_link = "https://developer.google.com/oauthplayground";

const { EMAIL, MALING_ID, MALING_SECRET, MAILING_REFRESH } = process.env;

const auth = new OAuth2(MALING_ID, MALING_SECRET, MAILING_REFRESH, oauth_link);

exports.sendVerifiedEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MALING_ID,
      clientSecret: MALING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Social Media Verification Email",
    html: `  <div style="padding: 20px; border: 2px solid rgb(143, 209, 143); text-align: center; font-family: Arial, Helvetica, sans-serif;"> <h2 style="color:blueviolet;">Welcome to Social Media</h2> <p>Hey ${name}, hope you are well. Verify your email address to get started with us </p> <a onMouseOver="this.style.background='blueviolet'", onMouseLeave="this.style.background='transparent'" style="border: 1px solid blue; text-decoration:none ; padding: 8px 16px; color:black; margin-top: 10px; display: inline-block; " href=${url}>Email Verify</a> </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

// send reset code
exports.sendResetCode = (email, name, code) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MALING_ID,
      clientSecret: MALING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Reset Code",
    html: `<div style="padding: 20px; border: 2px solid rgb(143, 209, 143); text-align: center; font-family: Arial, Helvetica, sans-serif;"> <h2 style="color:blueviolet;">Welcome to Social Media</h2> <p>Hey ${name}, hope you are well. Your password reset Code  </p> <p onMouseOver="this.style.background='blueviolet'", onMouseLeave="this.style.background='transparent'" style="border: 1px solid blue; text-decoration:none ; padding: 8px 16px; color:black; margin-top: 10px; display: inline-block;">${code}</p> </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
