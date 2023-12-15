"use client";
import React, { useState, useEffect } from "react";
import { TasksI } from "../interfaces";
import {
  TopBar,
  Kanban,
  TaskSummary,
  AddTask,
  FilteredTasks,
} from "@/app/components";
import { useUserContext } from "../context/userContext";

const page = () => {
  const [tasks, setTasks] = useState<TasksI[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchKey, setSearchKey] = useState("");
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
      {!isLoading && tasks && (
        <>
          <TopBar
            setTasks={setTasks}
            setShowAddForm={setShowAddForm}
            setSearchKey={setSearchKey}
          />
          {showAddForm && (
            <AddTask userId={userId} setShowAddForm={setShowAddForm} />
          )}
          <TaskSummary tasks={tasks} />
          {searchKey && <FilteredTasks tasks={tasks} searchKey={searchKey} />}
          {!searchKey && <Kanban tasks={tasks} />}
        </>
      )}
    </div>
  );
};

export default page;
