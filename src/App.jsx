import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar"; // Confirm your filename is Navbar.js

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch("https://todo-application-backend-t41q.onrender.com/api/users/profile", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = async () => {
    await fetch("https://todo-application-backend-t41q.onrender.com/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // or spinner component
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login onLogin={fetchProfile} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/tasks" element={<Todo />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="*" element={<Navigate to="/tasks" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
