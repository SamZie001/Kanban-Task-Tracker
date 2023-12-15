"use client";
import React from "react";
import { handleNewTask } from "../actions";
import { MdClose } from "react-icons/md";

const AddTask = ({
  userId,
  setShowAddForm,
}: {
  userId: string;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed top-0 left-0 z-20 bg-black h-[100vh] w-[100vw] text-white flex flex-col gap-2 justify-center items-center">
      <div className="flex justify-between items-center gap-5">
        <h1 className="text-lg text-accent-2 font-semibold">
          ~ Create A New Task ~
        </h1>
        <button className="btn" onClick={() => setShowAddForm(false)}>
          <MdClose />
        </button>
      </div>

      <div className="flex flex-col items-center gap-5 border-[1px] border-accent-1 w-[80%] md:w-[60%] p-5 rounded-xl">
        <form
          className="form"
          action={handleNewTask}
          onSubmit={() => {
            alert("Task created 👍🏾");
            setShowAddForm(false);
          }}
        >
          <input type="text" value={userId} name="userId" hidden />
          <input required type="text" name="title" placeholder="Title" />
          <textarea
            name="description"
            placeholder="Description"
            required
          ></textarea>
          <input type="date" required name="dueDate" />
          <button className="btn my-0 mx-auto !w-[100%] hover:bg-accent-1 hover:text-white">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
