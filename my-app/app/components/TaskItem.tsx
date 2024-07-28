// app/components/TaskItem.tsx
"use client"; // Add this line

import React, { useState } from 'react';
import { Task } from '../types/Task';
import { deleteTask, checkbox } from '../utils/api';

interface TaskItemProps {
  task: Task;
  onTaskDeleted: () => void;
  onTaskUpdate: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskDeleted, onTaskUpdate }) => {
  const [checked, setCheck] = useState(task.completed);

  const handleDelete = async () => {
    try {
      await deleteTask(task.task_id);
      onTaskDeleted(); // Refresh the task list after deletion
    } catch (error) {
      console.error("Error deleting the task:", error);
    }
  };

  const handleTaskUpdate = async () => {
    const newIsDoneValue = !checked;
    setCheck(newIsDoneValue);
    const updatedTask: Task = {
      ...task,
      completed: newIsDoneValue,
    };
    onTaskUpdate(updatedTask);
  };


  return (
    <li>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleTaskUpdate}
      />
      <span>{task.description}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};
export default TaskItem;
