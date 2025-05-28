import React, { useState } from "react";
import styles from "./Profile.module.css";  // import as styles object

export default function Profile({ user }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);
    data.append("userId", user.id);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    alert("Image uploaded: " + result.filename);
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileHeading}>👤 Profile</h2>

      <div className={styles.profileCard}>
        <p className={styles.profileText}>
          <strong>Username:</strong> {user.username}
        </p>

        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="User"
            className={styles.profileAvatar}
          />
        ) : (
          <form onSubmit={handleSubmit} className={styles.profileForm}>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className={styles.profileFileInput}
            />
            <button type="submit" className={styles.profileButton}>
              📤 Upload
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
