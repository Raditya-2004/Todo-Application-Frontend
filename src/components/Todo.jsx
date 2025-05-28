import React, { useState, useEffect } from "react";
import './Todo.css';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const API_URL = "https://todo-application-backend-t41q.onrender.com/api/tasks";

  // Fetch all tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL, {
        credentials: "include", // for cookies (JWT-based auth)
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    if (input.trim()) {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ task: input.trim() }),
        });
        if (!res.ok) throw new Error("Failed to add task");
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
        setInput("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = (id, task) => {
    setEditingId(id);
    setEditInput(task);
  };

  const saveTask = async (id) => {
    if (!editInput.trim()) {
      setEditingId(null);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ task: editInput.trim() }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated = await res.json();
      setTasks(tasks.map((task) => (task.id === id ? updated : task)));
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const clearList = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to clear list");
      setTasks([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo-container">
      <table className="todo-table">
        <thead>
          <tr>
            <th className="header">Task</th>
            <th className="header">Delete</th>
            <th className="header">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    onBlur={() => saveTask(task.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveTask(task.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <span>{task.task}</span>
                )}
              </td>
              <td>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button className="edit" onClick={() => editTask(task.id, task.task)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add something to your list"
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />
        <button className="add" onClick={addTask}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Todo;
