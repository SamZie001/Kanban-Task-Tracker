import React from "react";
import { AddTask, Logo, SearchTask } from "./";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between px-2 py-4 md:rounded-md">
      <Logo size={40} />

      <div className="flex w-2/4 items-center gap-4">
        <SearchTask />
        <AddTask />
      </div>
    </div>
  );
};

export default TopBar;
