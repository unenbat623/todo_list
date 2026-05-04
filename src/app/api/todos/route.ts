import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { Todo } from "@/db/models";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const userTodos = await Todo.find({ userId: session.user.id }).sort({ createdAt: -1 });

  // Map _id to id for frontend compatibility
  const formattedTodos = userTodos.map((t: any) => ({
    id: t._id.toString(),
    text: t.text,
    done: t.done,
    createdAt: t.createdAt,
  }));

  return NextResponse.json(formattedTodos);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { text } = await req.json();
  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  await dbConnect();
  const newTodo = await Todo.create({
    userId: session.user.id,
    text,
  });

  return NextResponse.json({
    id: newTodo._id.toString(),
    text: newTodo.text,
    done: newTodo.done,
    createdAt: newTodo.createdAt,
  }, { status: 201 });
}
