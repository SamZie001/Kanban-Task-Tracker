import React from "react";
import { PagePropsI } from "../interfaces";
import {
  MdAdd,
  MdArrowUpward,
  MdArrowDownward,
  MdDateRange,
} from "react-icons/md";

const TopBar = ({ user, setShowAddForm, setSearchKey }: PagePropsI) => {
  function isLetter(char: string) {
    const charCode = char.charCodeAt(0);
    return (
      (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
    );
  }
  return (
    <div className="text-white flex flex-col-reverse md:flex-row justify-between items-center gap-5">
      <div className="border-[1px] border-secondary w-[100%] md:w-[80%] rounded-lg flex justify-between overflow-hidden">
        <input
          className="bg-transparent px-4 py-2 outline-none w-[100%]"
          type="text"
          placeholder="Find a Task"
          // @ts-ignore
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>

      <div className="flex flex-row-reverse md:flex-row justify-between w-[100%] md:w-max gap-5">
        <div
          // @ts-ignore
          onClick={() => setShowAddForm(true)}
          className="cursor-pointer grid place-content-center w-10 h-10 bg-accent-1 border-[1px] border-accent-1 rounded-lg hover:bg-transparent hover:text-liner"
        >
          <MdAdd fontSize={30} />
        </div>

        <div className="flex justify-center items-center cursor-pointer px-2 bg-accent-1 border-[1px] border-accent-1 rounded-lg hover:bg-transparent hover:text-liner">
          <MdDateRange />
          <MdArrowUpward className="text-base" />
        </div>

        <div className="flex justify-center items-center cursor-pointer px-2 bg-accent-1 border-[1px] border-accent-1 rounded-lg hover:bg-transparent hover:text-liner">
          <MdDateRange />
          <MdArrowDownward className="text-base" />
        </div>

        <div className="rounded-full w-10 h-10 grid place-content-center font-bold bg-liner animate-pulse">
          {typeof user === "string" &&
            (isLetter(JSON.parse(user).username[0])
              ? JSON.parse(user).username[0].toUpperCase()
              : "👀")}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
