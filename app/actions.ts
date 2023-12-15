"use server";
import { connect } from "./lib/db";
import { Task } from "@/app/models/Tasks";
import { revalidatePath, revalidateTag } from "next/cache";

type updateDataType = {
  _id: null | string | FormDataEntryValue;
  title: null | string | FormDataEntryValue;
  description: null | string | FormDataEntryValue;
  status: null | string | FormDataEntryValue;
};

export async function handleEditTask(data: any) {
  let updateData = {
    _id: null,
    title: null,
    description: null,
    status: null,
  } as updateDataType;

  if (data instanceof FormData) {
    updateData._id = data.get("taskId");
    updateData.title = data.get("title");
    updateData.description = data.get("description");
  } else {
    updateData._id = data._id;
    updateData.status = data.status;
  }

  try {
    await connect();

    if (updateData.status)
      await Task.findOneAndUpdate(
        { _id: updateData._id },
        { $set: { status: updateData.status } }
      );
    else
      await Task.findOneAndUpdate(
        { _id: updateData._id },
        {
          $set: {
            title: updateData.title,
            description: updateData.description,
          },
        }
      );
    revalidatePath("/tasks");
    revalidateTag("tasks");
  } catch (error: any) {
    console.error(error);
  }
}

export async function handleNewTask(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const dueDate = formData.get("dueDate");
  const userId = formData.get("userId");

  try {
    await connect();
    await Task.create({ title, description, dueDate, user: userId });
    revalidatePath("/tasks");
    revalidateTag("tasks");
  } catch (error: any) {
    console.error(error);
  }
}
