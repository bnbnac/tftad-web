import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Title } from "../../components/shared";
import { Outlet } from "react-router-dom";

function Posts() {
  const HomeContainer = styled.span`
    display: flex;
    flex-direction: column;
  `;

  const PostsContainer = styled.span`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
  `;

  const PostContainer = styled.span`
    display: flex;
    height: 200px;
    width: 400px;
  `;

  const PostLink = styled.a`
    color: #007bff; /* Blue color */
    text-decoration: none; /* Remove underline */
    font-weight: bold;
    margin-bottom: 10px;
    display: block; /* Make the link a block element */
  `;

  const PostInfo = styled.span`
    margin-bottom: 5px;
  `;

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

  const filteredPosts = posts.filter((post) => post.published === true);

  return (
    <HomeContainer>
      <Title>New Posts</Title>
      <PostsContainer>
        {filteredPosts.map((post) => (
          <PostContainer>
            <PostLink href={`/posts/${post.id}`}>
              <PostInfo>{post.title}</PostInfo>
              <PostInfo>게시자 post.member.name</PostInfo>
              <PostInfo>풀어본사람 몇명</PostInfo>
              <PostInfo>정답률 어쩌고저쩌고</PostInfo>
              <PostInfo>게시일 어쩌고저쩌고</PostInfo>
            </PostLink>
          </PostContainer>
        ))}
      </PostsContainer>
      <Outlet />
    </HomeContainer>
  );
}

export default Posts;
