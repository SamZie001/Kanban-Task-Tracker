import { NextRequest } from "next/server";
import { Task, connect } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connect();
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");
    let tasks = [];

    if (id) tasks = await Task.find({ user: id });
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error: any) {
    console.log("error at /tasks api -get route");
    return new Response(JSON.stringify({}), {
      status: 500,
    });
  }
}
