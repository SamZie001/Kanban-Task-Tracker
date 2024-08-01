"use client";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { ActivitySpinner } from ".";
import TaskDataOps from "../lib/TaskDataOps";
import { PagePropsI } from "../lib/interfaces";

const AddTask = ({ user, setShowAddForm }: PagePropsI) => {
  const { AddTask } = TaskDataOps();
  const [formData, setFormData] = useState({
    user: user ? user._id : "",
    title: "",
    description: "",
    dueDate: "",
  });
  const { mutate, error, isPending, isSuccess } = AddTask(formData);

  useEffect(() => {
    isSuccess && setShowAddForm && setShowAddForm(false);
  }, [isSuccess]);

  return (
    <div className="fixed top-0 left-0 z-20 bg-secondary h-screen w-full text-white flex flex-col gap-2 justify-center items-center px-7">
      <button
        className="absolute top-5 right-5 text-lg flex gap-2 items-center border-[1px] border-liner p-1 rounded-md hover:bg-liner hover:text-red-400/95"
        onClick={() => setShowAddForm && setShowAddForm(false)}
      >
        <MdClose />
      </button>
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-accent-1">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
            Create a new task
          </h1>

          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Task title
              </label>
              <input
                required
                type="text"
                name="title"
                placeholder="Title"
                className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 text-white outline-none"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Task notes/description
              </label>
              <textarea
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                name="description"
                placeholder="Description"
                className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 text-white outline-none resize-none;"
                required
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                When is this task due?
              </label>
              <input
                type="date"
                required
                name="dueDate"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
                className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 text-white outline-none resize-none;"
              />
            </div>

            <div className="space-y-4">
              {error && (
                <p className="text-red-500 text-sm w-full text-center">
                  Could not add the task! Try again
                </p>
              )}

              <button
                className="btn my-0 mx-auto !w-[100%] hover:bg-accent-1 hover:text-white flex items-center justify-center"
                disabled={isPending}
                onClick={() => mutate()}
              >
                {isPending ? <ActivitySpinner /> : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
