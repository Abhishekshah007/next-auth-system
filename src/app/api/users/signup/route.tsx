import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import connect from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utilities/mailer";
// import Joi from "joi";

connect();

// const userSchema = Joi.object().keys({
//   name: Joi.string().required(),
//   userName: Joi.string().required(),
//   gender: Joi.string().required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(8).required(),
//   securityQuestion: Joi.string().required(),
//   securityQuestionAnswer: Joi.string().min(4).required(),
// });

interface ReqBody {
  name: string;
  userName: string;
  gender: string;
  email: string;
  password: string;
  securityQuestion: string;
  securityQuestionAnswer: string;
}

async function createUser(reqBody: ReqBody) {
  try {
    
 
    // Check if user already exists
    const isUserExist = await User.findOne({ email: reqBody.email });
    if (isUserExist) {
      throw new Error("User Already Exists");
    }

    // Hash the password and security answer
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    const hashedSecurityAnswer = await bcrypt.hash(
      reqBody.securityQuestionAnswer,
      salt
    );

    // Create new user
    const user = new User({
      name: reqBody.name,
      userName: reqBody.userName,
      gender: reqBody.gender,
      email: reqBody.email,
      password: hashedPassword,
      securityQuestion: reqBody.securityQuestion,
      securityQuestionAnswer: hashedSecurityAnswer,
    });
    console.log(user);
    // Save the user to the database

    await user.save();

    // Send verification email
    await sendEmail({
      emailId: reqBody.email,
      emailType: "VERIFY_EMAIL",
      userId: user._id,
    });

    console.log("Hello dear!");
    return new NextResponse(JSON.stringify({ message: "User Created" }), {
      status: 201,
    });
  } catch (error: any) {
    console.error("Error during user registration:", error.message);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    return createUser(reqBody);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
