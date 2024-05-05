import User from "@/schema/userSchema";
import bcryptjs from "bcryptjs";
import { MailtrapClient } from "mailtrap";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hashed token
    let email_template = "";
    console.log("this is the mailer, user id : " + userId);
    const hashedToken = await bcryptjs.hash(userId, 10);
    if (emailType === "verify") {
      // findById looks for the ids and update the values
      email_template = "5b3680e6-858d-4584-9235-4cf14e212b28";
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "reset") {
      email_template = "5b3680e6-858d-4584-9235-4cf14e212b28";
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // send the email via (mailtrap service)
    const client = new MailtrapClient({
      endpoint: process.env.MAILER_ENDPOINT,
      token: process.env.MAILER_TOKEN,
    });

    const sender = {
      email: "Ensa-agadir@demomailtrap.com",
      name: "ENSAA mailing service",
    };
    const recipients = [
      {
        email: email,
      },
    ];

    client.send({
      from: sender,
      to: recipients,
      template_uuid: email_template,
      template_variables: {
        verification_link: `${process.env.DOMAIN}/verify-email?email=${email}&token=${hashedToken}`,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
