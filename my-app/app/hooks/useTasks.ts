// app/hooks/useTasks.ts
"use client"
import { useState, useEffect } from 'react';
import { fetchTasks } from '../utils/api';
import { Task } from '../types/Task';

/**
 * Custom hook for managing tasks.
 * @returns An object containing the tasks, loading state, and a function to fetch data.
 */
const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState<Task[]>([]);

  /**
   * Fetches tasks data from the server.
   */
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchTasks();
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("There was an error fetching the data:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCompleted(tasks.filter((task) => task.completed === true));
  }, [tasks]);

  return { tasks, loading, fetchData, completed };
};

export default useTasks;