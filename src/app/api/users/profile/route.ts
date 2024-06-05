import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import connect from "@/dbConfig/dbConfig";
import { userDataId } from "@/utilities/userDataId";

connect();

async function profile(request: NextRequest) {
    try {
        const userId = await userDataId(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json({ message: `Error verifying JWT token: ${error.message}` }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
  return profile(request);
}
