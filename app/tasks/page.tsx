"use client";
import React, { useState, useEffect } from "react";
import { TasksI } from "../interfaces";
import { TopBar, Kanban, TaskSummary, FilteredTasks } from "@/app/components";
import { useUserContext } from "../context/userContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ITEMS } from "../lib/kanbanConfig";

const page = () => {
  const [tasks, setTasks] = useState<TasksI[] | []>([]);
  const [searchKey, setSearchKey] = useState("");
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/tasks?id=${JSON.parse(user)._id}`)
        .then((res) => {
          if (res.statusText === "OK") setTasks(res.data);
        })
        .catch((err) => console.log(err));
    }
    return;
  }, [user]);

  if (!user) {
    return useRouter().push("/login");
  }

  return (
    <div className="text-white section__padding">
      <TopBar searchKey={searchKey} setSearchKey={setSearchKey} />
      <TaskSummary tasks={ITEMS} />
      {searchKey.length ? (
        <FilteredTasks tasks={ITEMS} searchKey={searchKey} />
      ) : undefined}
      {!searchKey.length ? <Kanban /> : undefined}
    </div>
  );
};

export default page;
