"use client";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { useRouter } from "next/navigation";
import {
  TopBar,
  Kanban,
  TaskSummary,
  AddTask,
  FilteredTasks,
  ActivitySpinner,
} from "@/app/components";
import TaskDataOps from "../lib/TaskDataOps";
import { TasksI } from "../lib/interfaces";

const page = () => {
  const { FetchTasks } = TaskDataOps();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const { user } = useUserContext();
  const { data, isPending, error, isSuccess, status } = FetchTasks();
  const [tasks, setTasks] = useState<TasksI[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (user && data) {
      setTasks(data.filter((list: TasksI) => list.user == user._id));
    } else setTasks([]);
  }, [data, user]);

  useEffect(() => {
    if (!user && status == "success") router.push("/login");
  }, [status]);

  return (
    <div className="text-white section__padding ">
      {user && (
        <>
          <TopBar
            user={user}
            setShowAddForm={setShowAddForm}
            setSearchKey={setSearchKey}
          />

          {showAddForm && (
            <AddTask user={user} setShowAddForm={setShowAddForm} />
          )}
        </>
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
          <TaskSummary tasks={tasks} />
          {searchKey.length > 0 ? (
            <FilteredTasks tasks={tasks} searchKey={searchKey} />
          ) : (
            <Kanban tasks={tasks} />
          )}
        </>
      )}
    </div>
  );
};

export default page;
