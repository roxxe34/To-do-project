// app/components/TaskList.tsx
import React from 'react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTaskDeleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskDeleted }) => {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.task_id} task={task} onTaskDeleted={onTaskDeleted} />
      ))}
    </ul>
  );
};

export default TaskList;
