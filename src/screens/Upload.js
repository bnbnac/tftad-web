import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    videoUrl: "",
  });

  const { title, content, videoUrl } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/posts`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      console.log("Form submitted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
    setFormData({
      title: "",
      content: "",
      videoUrl: "",
    });
  };

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            name="videoUrl"
            value={videoUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
