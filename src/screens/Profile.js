import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Profile() {
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useState(null);
  const [postInfo, setPostInfo] = useState(null);

  const fetchMember = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/members/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch member info");
      }
      const data = await response.json();
      setMemberInfo(data);
    } catch (error) {
      console.error("Error fetching member info:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/posts`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch post info");
      }
      const data = await response.json();
      setPostInfo(data);
    } catch (error) {
      console.error("Error fetching post info:", error);
    }
  };
  useEffect(() => {
    fetchMember();
    fetchPost();
  }, []);

  const handleAddChannel = () => {
    fetch(`${process.env.REACT_APP_WEB_SERVER}/channels`, {
      method: "POST",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        fetchMember();
        fetchPost();
        navigate("/profiles");
      } else {
        console.error("Failed to exchange access token:", response.statusText);
        navigate("/profiles");
      }
    });
  };
  return (
    <div>
      <h1>Profile</h1>
      <a href={process.env.REACT_APP_GOOGLE_OAUTH}>Google Login</a>
      <button onClick={handleAddChannel}>Add Channel</button>
      {memberInfo && (
        <div>
          <p>Name: {memberInfo.name}</p>
          <p>Email: {memberInfo.email}</p>
          <hr />
          <h3>Channels</h3>
          <ul>
            {memberInfo.channels &&
              memberInfo.channels.map((channel, index) => (
                <li key={index}>
                  <div>
                    <p>Thumbnail</p>
                    <p>Title: {channel.title}</p>
                    <p>YouTube Channel ID: {channel.youtubeChannelId}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
      {postInfo && (
        <div>
          <hr />
          <h3>Posts</h3>
          <ul>
            <ul>
              {postInfo.map((post) => (
                <div key={post.id}>
                  <a
                    href={
                      post.published
                        ? `/posts/${post.id}`
                        : `/posts/${post.id}/progress`
                    }
                  >
                    <li>{post.id}</li>
                    <li>{post.title}</li>
                    <li>{post.content}</li>
                    <li>{post.published}</li>
                    <li>{post.videoUrl}</li>
                  </a>
                </div>
              ))}
            </ul>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
