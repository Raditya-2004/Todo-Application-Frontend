import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      style={{
        padding: "10px",
        backgroundColor: "#282c34",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: "bold" }}>MyApp</div>
      <div>
        {user ? (
          <>
            <Link
              to="/tasks"
              style={{ color: "white", marginRight: 15, textDecoration: "none" }}
            >
              Tasks
            </Link>
            <Link
              to="/profile"
              style={{ color: "white", marginRight: 15, textDecoration: "none" }}
            >
              Profile
            </Link>
            <button
              type="button"
              onClick={onLogout}
              style={{
                cursor: "pointer",
                backgroundColor: "#61dafb",
                border: "none",
                padding: "5px 10px",
                borderRadius: 5,
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "white", marginRight: 15, textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{ color: "white", marginRight: 15, textDecoration: "none" }}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
