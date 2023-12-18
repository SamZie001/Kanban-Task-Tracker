import React from "react";
import Link from "next/link";

const page = () => {
  console.clear()
  return (
    <div className="h-[100%] flex flex-col gap-12 justify-center items-center">
      <h1 className="text-accent-1 text-lg text-center drop-shadow-glow">
        Welcome to your personal Task Tracker
      </h1>
      <Link
        href="/tasks"
        className="btn | text-white hover:scale-125 animate-pulse hover:animate-none"
      >
        Have a look at your tasks
      </Link>
    </div>
  );
};

export default page;
