"use client";
import React, { useState, useEffect } from "react";
import { TasksI } from "../interfaces";
import { TopBar, Kanban, TaskSummary, FilteredTasks } from "@/app/components";
import { useUserContext } from "../context/userContext";
import { useRouter } from "next/router";
import { ITEMS } from "../lib/kanbanConfig";

const page = () => {
  const [tasks, setTasks] = useState<TasksI[] | []>([]);
  const [searchKey, setSearchKey] = useState("");
  const { user } = useUserContext();

  // if (!user) return router.push("/login");

  return (
    <div className="text-white section__padding">
      <TopBar
        tasks={tasks}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
      />
      <TaskSummary tasks={tasks} />
      {searchKey.length ? (
        <FilteredTasks tasks={tasks} searchKey={searchKey} />
      ) : undefined}
      {!searchKey.length ? <Kanban /> : undefined}
    </div>
  );
};

export default page;
