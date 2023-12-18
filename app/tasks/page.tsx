"use client";
import React, { useState } from "react";
import { useUserContext } from "../context/userContext";
import {
  TopBar,
  Kanban,
  TaskSummary,
  AddTask,
  FilteredTasks,
  ActivitySpinner,
} from "@/app/components";
import { useFetchTasks } from "@/app/lib/useTaskData";

const page = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const { user } = useUserContext();
  const { data, isPending, error, isSuccess } = useFetchTasks();

  return (
    <div className="text-white section__padding ">
      {user && (
        <TopBar
          user={user}
          setShowAddForm={setShowAddForm}
          setSearchKey={setSearchKey}
        />
      )}

      {isPending && (
        <div className="w-max my-10 mx-auto">
          <ActivitySpinner />
        </div>
      )}

      {error && (
        <p className="mt-10 text-red-500 text-center">
          Could not get your tasks at the time...
        </p>
      )}

      {isSuccess && data && (
        <>
          <TaskSummary tasks={data} />
          {searchKey && <FilteredTasks tasks={data} searchKey={searchKey} />}
          {!searchKey && <Kanban tasks={data} />}
        </>
      )}

      {showAddForm && (
        <AddTask userId={user._id} setShowAddForm={setShowAddForm} />
      )}
    </div>
  );
};

export default page;
