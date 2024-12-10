import { Resend } from 'resend';

const resend = new Resend(process.env.SEND_EMAIL_KEY);

export async function sendUpdatedCredentialsEmail(email, token, newPassword) {
  //This link can actually only be used when I implement a verification email feature
  const link = `http://localhost:3002/authPage/login?token=${token}`;

  return resend.emails.send({
    from: 'testing@resend.dev',
    to: email,
    subject: 'These are your updated credentials',
    html: `
      <h1>New credentials delivered</h1>
      <p>Your new password is: ${newPassword}</p>
      <p>Click the link below to login with your new credentials</p>
      <a href="${link}">Login to Quiz Generator</a>
    `,
  });
}
