// netlify/functions/send-email.js
require('dotenv').config(); // local dev only; Netlify ignores this in production
const nodemailer = require('nodemailer');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !message) {
      return { statusCode: 400, body: 'Missing required fields' };
    }

    // Create transporter using Mailtrap credentials (or any SMTP provider)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: Number(process.env.SMTP_PORT) || 587,
      // secure: false for 587/2525; if using 465 set secure: true
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // sender shown to Mailtrap
      to: process.env.CONTACT_EMAIL,                // your destination (Mailtrap captures)
      subject: `Portfolio contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p>${message}</p><hr/><p>From: ${name} &lt;${email}&gt;</p>`,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent (captured by Mailtrap).' }),
    };
  } catch (error) {
    console.error('send-email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Unknown error' }),
    };
  }
};
