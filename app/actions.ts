"use server";
import { TasksI } from "./interfaces";
export async function handleEditTask({
  _id,
  title,
  description,
  status,
}: {
  _id: TasksI["_id"];
  title: TasksI["title"];
  description: TasksI["description"];
  status: TasksI["status"];
}) {
  
}

export async function handleNewTask({
  title,
  description,
  dueDate,
}: {
  title: TasksI["title"];
  description: TasksI["description"];
  dueDate: TasksI["dueDate"];
}) {

}
