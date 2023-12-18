import React from "react";
import { PagePropsI } from "../lib/interfaces";
import {
  MdAdd,
  MdArrowUpward,
  MdArrowDownward,
  MdDateRange,
} from "react-icons/md";

const TopBar = ({ user, setShowAddForm, setSearchKey }: PagePropsI) => {
  function isLetter(firstChar: string | undefined) {
    if (typeof firstChar === "string") {
      return (
        (firstChar.charCodeAt(0) >= 65 && firstChar.charCodeAt(0) <= 90) ||
        (firstChar.charCodeAt(0) >= 97 && firstChar.charCodeAt(0) <= 122)
      );
    }
  }
  return (
    <div className="text-white flex flex-col-reverse md:flex-row justify-between items-center gap-5">
      <div className="border-[1px] border-secondary w-[100%] md:w-[80%] rounded-lg flex justify-between overflow-hidden">
        <input
          className="bg-transparent px-4 py-2 outline-none w-[100%]"
          type="text"
          placeholder="Find a Task"
          onChange={(e) => setSearchKey && setSearchKey(e.target.value)}
        />
      </div>

      <div className="flex flex-row-reverse md:flex-row justify-between w-[100%] md:w-max gap-5">
        <div
          onClick={() => setShowAddForm && setShowAddForm(true)}
          className="cursor-pointer grid place-content-center w-10 h-10 bg-accent-1 border-[1px] border-accent-1 rounded-lg hover:bg-transparent hover:text-liner"
        >
          <MdAdd fontSize={30} />
        </div>

        <button
          disabled
          className="flex justify-center items-center px-2 border-[1px] border-liner text-liner cursor-not-allowed rounded-lg "
        >
          <MdDateRange />
          <MdArrowUpward className="text-base" />
        </button>

        <button
          disabled
          className="flex justify-center items-center px-2 border-[1px] border-liner text-liner cursor-not-allowed rounded-lg "
        >
          <MdDateRange />
          <MdArrowDownward className="text-base" />
        </button>

        <div className="rounded-full w-10 h-10 grid place-content-center font-bold bg-liner animate-pulse">
          {isLetter(user?.username[0]) ? user?.username[0].toUpperCase() : "👀"}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
