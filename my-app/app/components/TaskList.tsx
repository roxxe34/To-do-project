// app/components/TaskList.tsx
import React from 'react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';
import { updateTask} from '../utils/api';

interface TaskListProps {
  tasks: Task[];
  completedTasks: Task[];
  onTaskDeleted: () => void;
}

/**
 * Renders a list of tasks.
 * 
 * @param tasks - An array of tasks to be rendered.
 * @param completedTasks - An array of completed tasks to be rendered.
 * @param onTaskDeleted - A callback function to be called when a task is deleted.
 * @returns The rendered list of tasks.
 */
const TaskList: React.FC<TaskListProps> = ({ tasks, completedTasks, onTaskDeleted }) => {
  return (
    <>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.task_id} task={task} onTaskDeleted={onTaskDeleted} onTaskUpdate={updateTask} />
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map(task => (
          <TaskItem key={task.task_id} task={task} onTaskDeleted={onTaskDeleted} onTaskUpdate={updateTask} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;