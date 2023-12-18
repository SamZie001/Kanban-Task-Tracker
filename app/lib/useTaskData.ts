"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
const patchTask = (id: string, data: {}, type: string) => {
  return axios.patch(`/api/tasks?id=${id}`, { data, type });
};
const deleteTask = (id: string) => {
  return axios.delete(`/api/tasks?id=${id}`);
};

// Export functions
export const useFetchTasks = () => {
  const { user } = useUserContext();
  return useQuery({
    queryKey: ["tasks", { userId: user._id }],
    queryFn: fetchTasks,
  });
};

export const useAddTask = (newTask: {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      alert("Task created 👍🏾");
    },
    onError: (error) => console.log(error),
  });
};

export const usePatchTask = (id: string, data: {}, type: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => patchTask(id, data, type),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    onError: (error) => console.log(error),
  });
};

export const useDeleteTask = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    onError: (error) => console.log(error),
  });
};
