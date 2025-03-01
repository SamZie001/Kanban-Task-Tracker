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
  moveTask: (id: Task["_id"], status: Task["status"]) => void;
  deleteTask: (id: Task["_id"]) => void;
  setSearchKey: (s: string) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: [],
      searchKey: "",
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, { ...task, _id: uuid(), status: "new", updatedAt: new Date() }] })),
      editTask: (task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t._id === task._id ? { ...task, _id: t._id, updatedAt: new Date() } : t)),
        })),
      moveTask: (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((task) => (task._id === id ? { ...task, status, updatedAt: new Date() } : task)),
        }));
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
