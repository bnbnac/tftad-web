import React, { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEB_SERVER}/posts`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <hr />
      <ul>
        {posts.map((post) => (
          <div>
            <li key={post.id}>{post.id}</li>
            <li key={post.title}>{post.title}</li>
            <li key={post.content}>{post.content}</li>
            <li key={post.published}>{post.published}</li>
            <li key={post.videoUrl}>
              {post.videoUrl}근데 이건 videoId가 아닌데?
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
