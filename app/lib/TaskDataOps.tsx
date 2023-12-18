import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function TaskDatOps() {
  const queryClient = useQueryClient();

  const fetchTasks = async () => {
    const { data } = await axios.get("/api/tasks");
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

  // Data Manipulation functions
  const FetchTasks = () => {
    return useQuery({
      queryKey: ["tasks"],
      queryFn: fetchTasks,
    });
  };

  const AddTask = (newTask: {}) => {
    return useMutation({
      mutationFn: () => addTask(newTask),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => console.log(error),
    });
  };

  const PatchTask = (id: string, data: {}, type: string) => {
    return useMutation({
      mutationFn: () => patchTask(id, data, type),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
      onError: (error) => console.log(error),
    });
  };

  const DeleteTask = (id: string) => {
    return useMutation({
      mutationFn: () => deleteTask(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
      onError: (error) => console.log(error),
    });
  };

  return { AddTask, PatchTask, DeleteTask, FetchTasks };
}
