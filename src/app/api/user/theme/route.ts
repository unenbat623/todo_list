import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { User } from "@/db/models";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { theme } = await req.json();
  if (!theme) {
    return NextResponse.json({ error: "Theme is required" }, { status: 400 });
  }

  await dbConnect();
  await User.findByIdAndUpdate(session.user.id, { theme });

  return NextResponse.json({ message: "Theme updated" });
}
