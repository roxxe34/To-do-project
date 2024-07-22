// app/components/TaskItem.tsx
"use client"; // Add this line

import React, { useState } from 'react';
import { Task } from '../types/Task';
import { deleteTask, checkbox } from '../utils/api';

interface TaskItemProps {
  task: Task;
  onTaskDeleted: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskDeleted }) => {
const [checked, setCheck] = useState(task.completed);
  const handleDelete = async () => {
    try {
      await deleteTask(task.task_id);
      onTaskDeleted(); // Refresh the task list after deletion
    } catch (error) {
      console.error("Error deleting the task:", error);
    }
  };
  const handleCheckboxChange = async () => {
    try {
        await checkbox(task.task_id, checked);
      setCheck(!task.completed) // Toggle the completed status
      
      onTaskDeleted()
    } catch (error) {
      console.error("Error updating the task:", error);
    }
  };



  return (
    <li>
      {task.description}
      <label className="custom-checkbox">
      <input type='checkbox' checked={checked} onChange={handleCheckboxChange}/>
        <span></span>
      </label>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TaskItem;
