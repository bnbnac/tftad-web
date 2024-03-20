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

  // Filter out posts where published is true
  const filteredPosts = posts.filter((post) => post.published === true);

  return (
    <div>
      <h1>Posts</h1>
      <hr />
      <ul>
        {filteredPosts.map((post) => (
          <div key={post.id}>
            <a href={`/posts/${post.id}`}>
              <li>{post.id}</li>
              <li>{post.title}</li>
              <li>{post.content}</li>
              <li>{post.published}</li>
              <li>{post.videoUrl}</li>
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
