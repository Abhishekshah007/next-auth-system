import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import { cookies } from "next/headers";

connect();

async function logout(request: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
    response.cookies.set('token', '', { maxAge: -1, httpOnly: true }); 
    return response;
  } catch (error: any) {
    console.error('Error deleting cookie:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return logout(request);
}