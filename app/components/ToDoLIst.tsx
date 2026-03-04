'use client';

import { useState, useEffect } from 'react';
import { json } from 'stream/consumers';

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

const ToDoList: React.FC = () => {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks) as Task[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask?.trim() === '') return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center bg-gray-600 text-white p-4 rounded-lg center shadow border border-gray-500b">
      <h1>To Do List</h1>

      <div className="flex flex-row ml-10 mr-10 gap-2 items-center justify-center">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          className="p-1 rounded border border-pink-50 text-white"
          placeholder="Add a new task"
        />
        <button className="bg-blue-500 px-3 py-1 rounded" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks?.map((task) => (
          <li
            key={task.id}
            className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300
               ${
                 task.isCompleted
                   ? 'bg-gray-650 opacity-75 border border-green-500/70  text-gray-500'
                   : 'bg-gray-700 border-transparent text-black'
               }
          `}
          >
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleComplete(task.id)}
              className="mr-2 h-5 w-5 text-black"
            />
            <span className={`flex-1`}>{task.title}</span>
            <span className="text-sm mr-4">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            <button
              className="border rounded bg-red-800 p-1 text-white border-red-800"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
