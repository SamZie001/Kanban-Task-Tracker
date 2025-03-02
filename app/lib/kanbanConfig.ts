import { Task } from "./interfaces";

type Column = Record<
  Task["status"],
  {
    name: string;
    items: Task[];
    colorTone: string;
  }
>;

export const createColumns = (tasks: Task[]): Column => {
  return {
    new: {
      name: "New",
      items: tasks.filter((task) => task.status === "new"),
      colorTone: "primary",
    },
    inProgress: {
      name: "In Progress",
      items: tasks.filter((task) => task.status === "inProgress"),
      colorTone: "orange-500",
    },
    complete: {
      name: "Completed",
      items: tasks.filter((task) => task.status === "complete"),
      colorTone: "green-500",
    },
  };
};
