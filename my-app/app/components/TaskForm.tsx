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
      <button className='<a href="#_" class="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700">
Button Text
<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</a>' type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default TaskForm;
