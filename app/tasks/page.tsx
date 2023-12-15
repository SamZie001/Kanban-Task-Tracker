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
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<TasksI[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const { user } = useUserContext();

  useEffect(() => {
    if (typeof user === "string") {
      const userId = JSON.parse(user)?._id;
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
  }, [user]);

  if (user)
    return (
      <div className="text-white section__padding ">
        {user && !isLoading && (
          <>
            <TopBar
              user={user}
              setTasks={setTasks}
              setShowAddForm={setShowAddForm}
              setSearchKey={setSearchKey}
            />
            {showAddForm && (
              <AddTask
                userId={JSON.parse(user)._id}
                setShowAddForm={setShowAddForm}
              />
            )}
            <TaskSummary tasks={tasks} />
            {searchKey && <FilteredTasks tasks={tasks} searchKey={searchKey} />}
            {!searchKey && <Kanban tasks={tasks} />}
          </>
        )}
      </div>
    );
  else
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Link href="/login" className="btn">
          Login to manage your tasks
        </Link>
      </div>
    );
};

export default page;
