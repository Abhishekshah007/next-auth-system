import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import connect from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;

    if (!token) {
      throw new Error("Invalid request");
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "Invalid Token" }));
    }

    user.isVerify = true;
    user.verifyToken = null;
    user.verifyTokenExpiry = null;

    await user.save();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during user verification:", error);
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    } else {
      throw error;
    }
  }
}