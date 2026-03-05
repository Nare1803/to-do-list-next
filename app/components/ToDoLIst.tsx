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

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

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

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  const saveEdit = (id: string) => {
    const trimmed = editValue.trim();
    if (!trimmed) {
      cancelEdit();
      return;
    }

    setTasks((item) =>
      item.map((t) =>
        t.id === id
          ? { ...t, title: trimmed, createdAt: new Date().toISOString() }
          : t,
      ),
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleKeyDownAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const handleKeyDownEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
  ) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-100 p-6">
      <div className="w-full max-w-xl bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-cyan-400">
          To Do List
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDownAdd}
            className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            placeholder="Add a new task"
          />

          <button
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 border ${
                task.isCompleted
                  ? 'bg-green-500/10 border-green-400/40 text-green-300'
                  : 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700'
              }`}
            >
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleComplete(task.id)}
                className="h-5 w-5 accent-cyan-500 cursor-pointer"
              />

              {editingId === task.id ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDownEdit(e, task.id)}
                    autoFocus
                    className="flex-1 p-1 bg-gray-800 border border-cyan-500/50 rounded text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="text-green-400 hover:text-green-300 px-2"
                  >
                    ✓
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-red-400 hover:text-red-300 px-2"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-between">
                  <span
                    className={`flex-1 cursor-pointer ${
                      task.isCompleted ? 'line-through opacity-70' : ''
                    }`}
                    onClick={() => !task.isCompleted && startEditing(task)}
                  >
                    {task.title}
                  </span>

                  <span className="text-xs opacity-50 hidden sm:block">
                    {new Date(task.createdAt).toLocaleString()}
                  </span>

                  <button
                    onClick={() => startEditing(task)}
                    className="flex items-center gap-1 border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 px-3 py-1 ml-2 rounded-lg hover:bg-cyan-500 hover:text-white hover:shadow-md transition-all duration-300"
                  >
                    Edit
                  </button>
                </div>
              )}

              <button
                className="border rounded-lg bg-red-500/20 p-2 text-red-400 border-red-500/40 hover:bg-red-500 hover:text-white transition"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-8 italic">
            No tasks yet. Add your first one!
          </p>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
