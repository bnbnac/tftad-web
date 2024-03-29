import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, PostContainer, Title } from "../../components/shared";
import { Outlet } from "react-router-dom";
import { timeAgo } from "../../tools/Util";

const PostsContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const PostLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const PostInfo = styled.span`
  margin-bottom: 5px;
`;

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEB_SERVER}/posts`
        );
        const data = await response.json();
        if (!response.ok) {
          console.log(data);
          throw new Error("Failed to fetch");
        }
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => post.published === true);

  return (
    <Container>
      <Title>New Posts</Title>
      <PostsContainer>
        {filteredPosts.map((post) => (
          <PostContainer>
            <PostLink href={`/posts/${post.id}`}>
              <PostInfo style={{ fontSize: "26px" }}>{post.title}</PostInfo>
              <PostInfo>uploaded: {timeAgo(new Date(post.createdAt))}</PostInfo>
            </PostLink>
          </PostContainer>
        ))}
      </PostsContainer>
      <Outlet />
    </Container>
  );
}

export default Posts;
