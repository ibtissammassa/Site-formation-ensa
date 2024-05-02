// domain.com/verifytoken/klmjfpoiazjr
// domain.com/verfiytoken?token=qkfhaojfnsmfn

import nodemailer from "nodemailer";
import User from "@/schema/userSchema";
import bcryptjs from "bcryptjs";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hashed token
    console.log("this is the mailer, user id : " + userId);
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "verify") {
      // findById looks for the ids and update the values
      await User.findById(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "reset") {
      await User.findById(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const verificationMessage =
      "Filicitation ! vous avez terminer la procedure de la pre-inscription.\nVerifier votre addresse email.";
    const verificationHtml = `<p>Cliqué <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}>ici</a> pour verifier votre addresse email.</p>`;
    const resetMessage = "Changer votre mot de passe.";
    const resetHtml = `<p>Cliqué <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}>ici</a> pour changer votre mot de passe.</p>`;

    const mailOptions = {
      from: "formation-ensa-agadir@gmail.com",
      to: email,
      subject: emailType === "verify" ? verificationMessage : resetMessage,
      html: emailType === "verify" ? verificationHtml : resetHtml,
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
