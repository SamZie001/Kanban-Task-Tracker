"use client";
import React, { useState, useEffect } from "react";
import { TasksI } from "../interfaces";
import {
  TopBar,
  Kanban,
  TaskSummary,
  FilteredTasks,
  AddTask,
} from "@/app/components";
import { useUserContext } from "../context/userContext";

const page = () => {
  const [tasks, setTasks] = useState<TasksI[] | [] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useUserContext();
  const userId = JSON.parse(user)?._id;

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetch(`/api/tasks?id=${userId}`, {
        next: { tags: ["tasks"], revalidate: 10 },
      })
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    }
  }, [userId]);

  return (
    <div className="text-white section__padding">
      <TopBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        setShowAddForm={setShowAddForm}
      />
      {showAddForm && (
        <AddTask userId={userId} setShowAddForm={setShowAddForm} />
      )}
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
