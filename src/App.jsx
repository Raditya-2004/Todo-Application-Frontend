import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Todo from "./components/Todo";
import Navbar from "./components/Navibar";



function App() {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users/profile", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = async () => {
    await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  if (!user) {
    return (
      <BrowserRouter>
        <Navbar user={null} />
        <Routes>
          <Route path="/login" element={<Login onLogin={fetchProfile} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        <Route path="/tasks" element={<Todo />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
