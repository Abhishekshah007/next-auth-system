import User from "@/models/userModels";
import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { NextResponse } from "next/server";

dotenv.config();

interface EmailOptions {
  emailId: string;
  emailType: 'VERIFY_EMAIL' | 'FORGOT_PASSWORD';
  userId: string;
}

export const sendEmail = async ({ emailId, emailType, userId }: EmailOptions) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    const encodedHashedToken = encodeURIComponent(hashedToken);
    const expiryTime = Date.now() + 3600000; //Note: 1 hour

    if (emailType === "VERIFY_EMAIL") {
      await User.findByIdAndUpdate(userId,{ $set:{
        verifyToken: encodedHashedToken,
        verifyTokenExpiry: expiryTime,
      }});
    } else if (emailType === "FORGOT_PASSWORD") {
      await User.findByIdAndUpdate(userId, { $set:{
        forgotPasswordToken: encodedHashedToken,
        forgotPasswordExpiry: expiryTime,
      }});
    }

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = emailType === "FORGOT_PASSWORD" ? "Forgot Password" : "Verify Email";
    const actionUrl = emailType === "FORGOT_PASSWORD"
      ? `${process.env.DOMAIN}/frontend/reset-password/?token=${hashedToken}`
      : `${process.env.DOMAIN}/frontend/verify-email/?token=${hashedToken}`;

    const options = {
      from: process.env.EMAIL_FROM, // Use environment variable
      to: emailId,
      subject: subject,
      text: subject,
      html: `<h1>Click here to ${subject.toLowerCase()}</h1><a href="${actionUrl}">${subject}</a>`,
    };

    await transport.sendMail(options);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error); 
    throw error;
  }
};
