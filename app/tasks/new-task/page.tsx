import React from "react";

const page = () => {
  const minDate = new Date().setDate(new Date().getDate() + 1);
  return (
    <div className="h-[100%] w-[100%] text-white flex flex-col gap-2 justify-center items-center">
      <h1 className="text-lg text-accent-2 font-semibold">
        ~ Create A New Task ~
      </h1>
      <div className="flex flex-col items-center gap-5 border-[1px] border-accent-1 w-[80%] md:w-[60%] p-5 rounded-xl">
        <form className="form">
          <input required type="text" name="title" placeholder="Title" />
          <textarea
            name="description"
            placeholder="Description"
            required
          ></textarea>
          <input type="date" name="dueDate" />
          <button className="btn my-0 mx-auto !w-[100%] hover:bg-accent-1 hover:text-white">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
