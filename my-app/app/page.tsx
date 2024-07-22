// app/page.tsx
"use client";
import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import useTasks from './hooks/useTasks';

const Home: React.FC = () => {
  const { tasks, loading, fetchData } = useTasks();

  return (
    <div>
      <h1>To Do List</h1>
      <TaskForm onTaskAdded={fetchData} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskList tasks={tasks} onTaskDeleted={fetchData} />
      )}
    </div>
  );
};

export default Home;
