import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface UserData {
  userId: string;
  email: string;
  userName: string;
  name: string;
  gender: string;
}

export async function userDataId(request: NextRequest): Promise<string> {
  try {
    const token = request.cookies.get('token')?.value || "";

    // Check if the token is empty or null
    if (!token) {
      throw new Error("Token is missing or invalid");
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as UserData;

    // Check if the decoded token is of the expected type
    if (!("userId" in decodedToken)) {
      throw new Error("Decoded token is missing 'userId' property");
    }

    return decodedToken.userId;
  } catch (error: any) {
    console.error('Error verifying JWT token:', error);
    throw new Error(`Error verifying JWT token: ${error.message}`);
  }
}