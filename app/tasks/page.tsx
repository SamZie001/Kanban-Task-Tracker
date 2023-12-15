"use client";
import React, { useState } from "react";
import { TopBar, Kanban, TaskSummary, FilteredTasks } from "@/app/components";
import { useUserContext } from "../context/userContext";
import useFetchTasks from "@/app/hook/useFetch";

const page = () => {
  const [searchKey, setSearchKey] = useState("");
  const { user } = useUserContext();
  const userId = JSON.parse(user)?._id;
  const { tasks, isLoading } = useFetchTasks(userId);

  return (
    <div className="text-white section__padding">
      <TopBar searchKey={searchKey} setSearchKey={setSearchKey} />
      {!isLoading && tasks && (
        <>
          <TaskSummary tasks={tasks} />
          {searchKey.length ? (
            <FilteredTasks tasks={tasks} searchKey={searchKey} />
          ) : undefined}
          {!searchKey.length ? <Kanban tasks={tasks} /> : undefined}
        </>
      )}
    </div>
  );
};

export default page;
