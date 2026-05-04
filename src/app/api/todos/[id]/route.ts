import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { Todo } from "@/db/models";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { done } = await req.json();
  const { id: todoId } = await params;

  await dbConnect();
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId, userId: session.user.id },
    { done },
    { new: true }
  );

  if (!updatedTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: updatedTodo._id.toString(),
    text: updatedTodo.text,
    done: updatedTodo.done,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: todoId } = await params;

  await dbConnect();
  const deletedTodo = await Todo.findOneAndDelete({
    _id: todoId,
    userId: session.user.id,
  });

  if (!deletedTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Todo deleted" });
}
