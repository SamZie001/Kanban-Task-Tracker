import { NextRequest } from "next/server";
import { User, connect } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  await connect();
  try {
    const { username, password } = await req.json();
    const user = await User.create({ username, password });
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error: any) {
    let errors: { username: string | null; password: string | null } = {
      username: null,
      password: null,
    };
    if (error.message.includes("users validation failed: password"))
      errors.password = "Minimum 8 characters";
    if (error.code === 11000) errors.username = "Username is already taken";
    return new Response(JSON.stringify(errors), { status: 400 });
  }
}
