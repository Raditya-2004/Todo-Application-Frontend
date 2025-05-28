import { useState } from "react";

const Upload = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("username", form.username);
      data.append("password", form.password);
      data.append("myfile", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Upload failed");
      }

      const result = await res.json();
      alert("Image uploaded: " + result.path);
      // Optionally reset form here
      setForm({ username: "", password: "" });
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <br />
      <input type="file" onChange={handleFileChange} required />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Uploading...</p>}
      <button type="submit" disabled={loading || !form.username || !form.password || !file}>
        Upload
      </button>
    </form>
  );
};

export default Upload;
