const nodemailer = require('nodemailer');
const { gmail, password } = require('../../config');

const createTransporter = () => {
  if (!gmail || !password) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmail,
      pass: password,
    },
  });
};

const otpMail = async (email, participant) => {
  const transporter = createTransporter();
  if (!transporter) {
    return;
  }

  await transporter.sendMail({
    from: process.env.MAIL_FROM || gmail,
    to: email,
    subject: 'Kode OTP Aktivasi Akun',
    html: `
      <h3>Halo ${participant.firstName || ''} ${participant.lastName || ''}</h3>
      <p>Kode OTP aktivasi akun Anda adalah:</p>
      <h2>${participant.otp}</h2>
      <p>Kode hanya berlaku untuk aktivasi akun Anda.</p>
    `,
  });
};

module.exports = { otpMail };
