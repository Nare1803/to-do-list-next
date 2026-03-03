import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

const ToDoList: React.FC = () => {
  const [newTask, setNewTask] = useState<string>();
  const [tasks, setTasks] = useState<Task[]>();
  return (
    <div className="flex flex-col gap-2 items-center justify-center bg-gray-600 text-white p-4 rounded-lg center shadow border border-gray-500b">
      <h1>To Do List</h1>

      <div className="flex flex-row ml-10 mr-10 gap-2 items-center justify-center">
        <input
          type="text"
          value={newTask}
          className="p-1 rounded border border-pink-50 text-white"
          placeholder="Add a new task"
        />
        <button className="bg-blue-500 px-3 py-1 rounded">Add</button>
      </div>
      <ul className="space-y-2">
        {tasks?.map((task) => (
          <li
            key={task.id}
            className="flex items-center p-2 bg-gray-100 rounded-md shadow-sm"
          >
            {task.title}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
