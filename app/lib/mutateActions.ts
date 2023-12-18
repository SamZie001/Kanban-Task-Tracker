"use server";
import { connect } from "./db";
import { Task } from "@/app/models/Tasks";
import { revalidatePath, revalidateTag } from "next/cache";
import axios from "axios";

type updateDataType = {
  _id: null | FormDataEntryValue;
  title: null | FormDataEntryValue;
  description: null | FormDataEntryValue;
  status: null | FormDataEntryValue;
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
export const axiosMutateTask = async (id: string, method: string, data: {}) =>
  await axios({ method, url: `/api/tasks?id=${id}`, data });
