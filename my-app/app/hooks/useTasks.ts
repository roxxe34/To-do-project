// app/hooks/useTasks.ts
"use client"
import { useState, useEffect } from 'react';
import { fetchTasks } from '../utils/api';
import { Task } from '../types/Task';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { tasks, loading, fetchData };
};

export default useTasks;
