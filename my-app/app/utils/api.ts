// app/utils/api.ts
import axios from 'axios';
import { Task } from '../types/Task';

const todoApiEndpoint = "https://tsgo2tt5n4hcvsbgmmzfvtxem40pdpmb.lambda-url.eu-west-3.on.aws";

export const fetchTasks = () => axios.get(`${todoApiEndpoint}/list_tasks/hamza`);
export const addTask = (description: string) =>
  axios.post(`${todoApiEndpoint}/tasks`, { description, user_id: "hamza" });
export const deleteTask = (taskId: string) =>
  axios.delete(`${todoApiEndpoint}/tasks/${taskId}`);
export const checkbox = (taskId: string, completed: boolean) =>
    axios.put(`${todoApiEndpoint}/tasks/${taskId}`, {completed , user_id: "hamza" })
export const updateTask = (updatedTask: Task) =>
  axios.put(`${todoApiEndpoint}/tasks/${updatedTask.task_id}`, {
    description: updatedTask.description,
    user_id: updatedTask.user_id,
    completed: updatedTask.completed
  });

