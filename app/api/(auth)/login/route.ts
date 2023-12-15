import { NextRequest } from "next/server";
import { User, connect } from "@/app/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  await connect();
  try {
    const { username, password } = await req.json();
    const user = await User.findOne({ username });

    if (user) {
      if (await bcrypt.compare(password, user.password))
        return new Response(
          JSON.stringify({ _id: user._id, username: user.username }),
          { status: 200 }
        );
      else throw new Error("Incorrect Password");
    } else throw new Error("Invalid Username");
  } catch (error: any) {
    let errors: { username: string | null; password: string | null } = {
      username: null,
      password: null,
    };
    if (error instanceof Error) {
      if (error.message.includes("Username")) errors.username = error.message;
      if (error.message.includes("Password")) errors.password = error.message;

      return new Response(JSON.stringify(errors), {
        status: 400,
      });
    } else {
      console.error("unknown error at register api route");
      return new Response(JSON.stringify({ message: "Unknown error" }), {
        status: 500,
      });
    }
  }
}
