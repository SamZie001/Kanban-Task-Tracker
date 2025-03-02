import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

import { Task } from "./interfaces";

type State = {
  tasks: Task[];
  searchKey: string;
};

type Actions = {
  addTask: (task: Pick<Task, "title" | "description">) => void;
  editTask: (task: Task) => void;
  moveTask: (id: Task["_id"], destinationColumnId: Task["status"], destinationIndex: number) => void;
  deleteTask: (id: Task["_id"]) => void;
  setSearchKey: (s: string) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: [
        {
          _id: "1",
          title: "Welcome to Maiboard",
          description: "Save tasks here, pin to your bookmarks on your browser for easy access while working online",
          status: "new",
          updatedAt: new Date(),
        },
        {
          _id: "2",
          title: "I'M ON IT!!!",
          description: "Currently working on a task? Drag it in here to keep tabs on your ongoing tasks",
          status: "inProgress",
          updatedAt: new Date(),
        },
        {
          _id: "3",
          title: "Completed a task?",
          description: "Completed a task? Simply drag it to this column so you can easily track your progress",
          status: "complete",
          updatedAt: new Date(),
        },
      ],
      searchKey: "",
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, { ...task, _id: uuid(), status: "new", updatedAt: new Date() }] })),
      editTask: (task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t._id === task._id ? { ...task, _id: t._id, updatedAt: new Date() } : t)),
        })),
      moveTask: (id, destinationColumnId, destinationIndex) => {
        set((state) => {
          const tasks = [...state.tasks];
          const taskIndex = tasks.findIndex((task) => task._id === id);
          const [movedTask] = tasks.splice(taskIndex, 1); // Remove the task from its current position

          // Update the task's status to the new column ID
          const updatedTask: Task = { ...movedTask, status: destinationColumnId, updatedAt: new Date() };

          // Insert the updated task into the new position
          tasks.splice(destinationIndex, 0, updatedTask);

          return { tasks }; // Return the updated tasks array
        });
      },
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== id),
        })),
      setSearchKey: (searchKey) => set(() => ({ searchKey })),
    }),
    { name: "task-store" },
  ),
);
