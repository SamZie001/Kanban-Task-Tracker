import { NextRequest } from "next/server";
import { Task, connect } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connect();
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    const tasks = await Task.find({ user: id });
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error: any) {
    console.error("error at /tasks api route");
    return new Response(JSON.stringify({ message: "Unknown error" }), {
      status: 500,
    });
  }
}
