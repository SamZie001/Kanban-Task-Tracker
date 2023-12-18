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

// export async function PATCH(req: NextRequest) {
//   // let updateData = {
//   //   _id: null,
//   //   title: null,
//   //   description: null,
//   //   status: null,
//   // } as updateDataType;

//   // if (data instanceof FormData) {
//   //   updateData._id = data.get("taskId");
//   //   updateData.title = data.get("title");
//   //   updateData.description = data.get("description");
//   // } else {
//   //   updateData._id = data._id;
//   //   updateData.status = data.status;
//   // }

//   try {
//     await connect();
//     const { searchParams } = req.nextUrl;
//     const id = searchParams.get("id");
//     const body

//     if (updateData.status)
//       await Task.findOneAndUpdate(
//         { _id: updateData._id },
//         { $set: { status: updateData.status } }
//       );
//     else
//       await Task.findOneAndUpdate(
//         { _id: updateData._id },
//         {
//           $set: {
//             title: updateData.title,
//             description: updateData.description,
//           },
//         }
//       );

//     return new Response(JSON.stringify({}), { status: 200 });
//   } catch (error: any) {
//     console.log("error at /tasks api -post route");
//     return new Response(JSON.stringify({}), {
//       status: 500,
//     });
//   }
// }

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
