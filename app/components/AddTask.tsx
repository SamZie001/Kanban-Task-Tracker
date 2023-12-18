"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { ActivitySpinner } from ".";
import { useAddTask } from "../lib/useTaskData";

const AddTask = ({
  userId,
  setShowAddForm,
}: {
  userId: string;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [formData, setFormData] = useState({
    user: userId,
    title: "",
    description: "",
    dueDate: "",
  });
  const { mutate, error, isPending } = useAddTask(formData);

  return (
    <div className="fixed top-0 left-0 z-20 bg-black h-[100vh] w-[100vw] text-white flex flex-col gap-2 justify-center items-center px-7">
      <div className="flex justify-between items-center gap-5">
        <h1 className="text-lg text-accent-2 font-semibold">
          ~ Create A New Task ~
        </h1>
        <button
          className="text-sm flex gap-2 items-center border-[1px] border-liner p-1 rounded-md hover:bg-liner hover:text-red-400/95"
          onClick={() => setShowAddForm(false)}
        >
          <MdClose />
        </button>
      </div>

      <div className="form">
        <input
          required
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <textarea
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          name="description"
          placeholder="Description"
          required
        ></textarea>

        <input
          type="date"
          required
          name="dueDate"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
          }
        />

        {error && <p className="text-red-500">Could not add the task</p>}

        {!isPending && (
          <button
            className="btn my-0 mx-auto !w-[100%] hover:bg-accent-1 hover:text-white"
            disabled={isPending}
            onClick={() => mutate()}
          >
            Add Task
          </button>
        )}

        {isPending && (
          <div className="wmax my-10 mx-auto">
            <ActivitySpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTask;
