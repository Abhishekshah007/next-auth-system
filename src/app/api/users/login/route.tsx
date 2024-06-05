import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import connect from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

connect();

async function login(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      throw new Error("Invalid request");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (!bcrypt.compare(password, user.password)) {
      throw new Error("Invalid credentials");
    }

    const payload = {
      userId: user._id,
      email,
      userName: user.userName
    };

    const token = await jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: '1d'
    });

    cookies().set({ name: 'token', value: token, maxAge: 60 * 60 * 24, httpOnly: true });

    return new NextResponse(JSON.stringify({ message: "Login successful" }), {
      status: 200,
    });

  } catch (error:any) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return login(request);
}