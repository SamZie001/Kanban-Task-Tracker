import React from "react";
import { AddTask, Logo, SearchTask } from "./";

const TopBar = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-8 px-2 py-4 sm:flex-row md:rounded-md">
      <Logo size={40} />

      <div className="flex items-center gap-4 sm:w-2/4">
        <SearchTask />
        <AddTask />
      </div>
    </div>
  );
};

export default TopBar;
