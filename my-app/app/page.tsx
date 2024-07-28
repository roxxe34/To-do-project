// app/page.tsx
"use client";
import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import useTasks from './hooks/useTasks';

const Home: React.FC = () => {
  const { tasks, loading, fetchData, completed} = useTasks();

  return (
    <div>
      <h1>To Do List</h1>
      <TaskForm onTaskAdded={fetchData} /> {/* Renders a TaskForm component with the onTaskAdded prop set to the fetchData function. */}
      {loading ? (
        <p>Loading...</p> // Renders a loading message if the loading state is true.
      ) : (
        <TaskList tasks={tasks} onTaskDeleted={fetchData} completedTasks={completed}  /> // Renders a TaskList component with the tasks prop set to the tasks array and the onTaskDeleted prop set to the fetchData function.
      )}
    </div>
  );
};

export default Home;
