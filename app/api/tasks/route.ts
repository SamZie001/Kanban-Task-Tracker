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
    console.log("error at /tasks api -get route");
    return new Response(JSON.stringify({}), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect();
    const newTask = await req.json();
    await Task.create(newTask);
    return new Response(JSON.stringify(newTask), { status: 200 });
  } catch (error: any) {
    console.log("error at /tasks api -post route");
    return new Response(JSON.stringify({}), {
      status: 500,
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const _id = searchParams.get("id");
    const { data, type } = await req.json();

    console.log({ data, type });

    if (type === "textEdit") {
      await Task.findOneAndUpdate(
        { _id },
        {
          $set: {
            title: data.title,
            description: data.description,
          },
        }
      );
    }
    if (type === "dragEdit") {
      await Task.findOneAndUpdate(
        { _id },
        {
          $set: {
            status: data.status,
          },
        }
      );
    }

    return new Response(JSON.stringify({}), { status: 200 });
  } catch (error: any) {
    console.log("error at /tasks api -post route");
    return new Response(JSON.stringify({}), {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connect();
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");
    await Task.findByIdAndDelete(id);
    return new Response(JSON.stringify({}), { status: 200 });
  } catch (error: any) {
    console.log("error at /tasks api -delete route");
    return new Response(JSON.stringify({}), {
      status: 500,
    });
  }
}
