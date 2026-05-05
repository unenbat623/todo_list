import dbConnect from "@/lib/db";
import { User } from "@/db/models";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    console.log("Starting registration for:", username);
    await dbConnect();
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
    });

    console.log("User registered successfully");
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Registration error detail:", error);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error.message 
    }, { status: 500 });
  }
}
