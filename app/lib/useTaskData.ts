"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserContext } from "../context/userContext";

const fetchTasks = async ({ queryKey }: any) => {
  const [_, { userId }] = queryKey;
  const { data } = await axios.get(`/api/tasks?id=${userId}`);
  return data;
};
const addTask = (newTask: {}) => {
  return axios.post(`/api/tasks`, newTask);
};
const patchTask = (id: string) => {
  return axios.patch(`/api/tasks?id=${id}`);
};
const deleteTask = (id: string) => {
  return axios.delete(`/api/tasks?id=${id}`);
};

export const useFetchTasks = () => {
  const { user } = useUserContext();
  return useQuery({
    queryKey: ["tasks", { userId: user._id }],
    queryFn: fetchTasks,
  });
};

export const useAddTask = (newTask: {}) => {
  return useMutation({
    mutationFn: () => addTask(newTask),
    onSuccess: () => {
      alert("Task created 👍🏾");
      // queryClient.invalidateQueries({
      //   queryKey: ["tasks"],
      // });
      // setShowAddForm(false);
    },
    onError: (error) => console.log(error),
  });
};

export const usePatchTask = (id: string) => {
  return useMutation({
    mutationFn: () => patchTask(id),
  });
};
export const useDeleteTask = (id: string) => {
  const {} = useMutation({
    mutationFn: () => deleteTask(id),
  });
};
