import React from "react";
import { AddTask, Logo, SearchTask } from "./";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";

const TopBar = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-8 px-2 py-4 sm:flex-row md:rounded-md">
      <Logo size={40} />

      <div className="flex w-full items-center gap-4 sm:w-2/4">
        <SearchTask />
        <AddTask />
        <Link href="https://github.com/SamZie001/Kanban-Task-Tracker" target="_blank" className="text-primary">
          <IoLogoGithub size={35} />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
