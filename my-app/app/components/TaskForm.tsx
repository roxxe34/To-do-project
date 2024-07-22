// app/components/TaskForm.tsx
'use client';

import React, { useState } from 'react';
import { addTask } from '../utils/api';

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const form = event.target as HTMLFormElement;
    const description = form.description.value;

    try {
      await addTask(description);
      onTaskAdded(); // Refresh the task list after submission
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name="description" disabled={pending} />
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default TaskForm;
