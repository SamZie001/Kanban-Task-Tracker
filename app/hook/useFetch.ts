"use client";
import { TasksI } from "../interfaces";
import { useState, useEffect } from "react";

export default function useFetchTasks(id: string) {
  const [tasks, setTasks] = useState<TasksI[] | [] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`/api/tasks?id=${id}`, {
        next: { tags: ["tasks"], revalidate: 60 },
      })
        .then((res) => {
          res.json().then((data) => setTasks(data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
      setIsLoading(false);
    }
  }, [id]);

  return { tasks, isLoading };
}
