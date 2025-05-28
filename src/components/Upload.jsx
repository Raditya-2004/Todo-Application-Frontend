import { useState } from "react";

const Upload = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [file, setFile] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", form.username);
    data.append("password", form.password);
    data.append("myfile", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    alert("Image uploaded: " + result.path);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <input type="file" onChange={handleFileChange} /><br />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;
