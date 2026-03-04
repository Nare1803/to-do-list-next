'use client';

import { useState, useEffect } from 'react';

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
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-100 p-6">
      <div className="w-full max-w-xl bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-cyan-400">
          To Do List
        </h1>

        <div className="flex flex-row gap-3 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            placeholder="Add a new task"
          />
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 border
                ${
                  task.isCompleted
                    ? 'bg-green-500/10 border-green-400/40 text-green-300'
                    : 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700'
                }
              `}
            >
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleComplete(task.id)}
                className="h-5 w-5 accent-cyan-500"
              />

              <span
                className={`flex-1 ${
                  task.isCompleted ? 'line-through opacity-70' : ''
                }`}
              >
                {task.title}
              </span>

              <span className="text-xs opacity-50 hidden sm:block">
                {new Date(task.createdAt).toLocaleString()}
              </span>

              <button
                className="border rounded-lg bg-red-500/20 p-2 text-red-400 border-red-500/40 hover:bg-red-500 hover:text-white transition"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
