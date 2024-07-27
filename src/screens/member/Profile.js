import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  ButtonContainer,
  Container,
  PostContainer,
  StyledA,
  Title,
  TitleSmall,
} from "../../components/Shared";
import Channel from "../../components/Channel";
import { timeAgo } from "../../tools/Util";

const MemberContainer = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  margin-right: 30px;
`;

const ChannelContainer = styled.span`
  border: 1px solid darkorchid;
  display: flex;
  width: 300px;
  border-radius: 5px;
  background-color: mintcream;
  justify-content: space-between;
  margin: 10px;
`;

const ProfileContainer = styled.span`
  display: flex;
  margin-bottom: 5px;
`;

const PostsContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
`;

const ChannelsContainer = styled.span`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
`;

const PostLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 50px;
  display: flex;
  width: 250px;
  flex-direction: column;
`;

const PostInfo = styled.span`
  margin-bottom: 5px;
`;

const MemberInfoContainer = styled.span`
  display: flex;
  margin: 15px;
  margin-right: 30px;
`;

const MemberInfo = styled.span`
  display: flex;
  margin-bottom: 5px;
`;

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
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        throw new Error("Failed to fetch");
      }
      setMemberInfo(data);
    } catch (error) {
      console.error("Error fetching member info:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/posts/my`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
      }
      setPostInfo(data);
    } catch (error) {
      console.error("Error fetching post info:", error);
    }
  };

  useEffect(() => {
    fetchMember();
    fetchPost();
  }, []);

  const onClickEditPost = (post) => {
    navigate(`/posts/edit/${post.id}`, { state: { post } });
  };

  const onClickEditMember = (member) => {
    navigate(`/members/edit`, { state: { member } });
  };

  const onClickDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Failed to delete post");
      }
      fetchPost();
      navigate("/profiles");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const onClickDeleteChannel = async (channelId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/channels/${channelId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Failed to delete post");
      }
      fetchMember();
      navigate("/profiles");
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  if (!memberInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Profile</Title>
      <ProfileContainer>
        {memberInfo && (
          <MemberInfoContainer>
            <MemberContainer>
              <MemberInfo style={{ fontSize: "16px" }}>
                Name: {memberInfo.member.name}
              </MemberInfo>
              <MemberInfo style={{ fontSize: "16px" }}>
                Email: {memberInfo.member.email}
              </MemberInfo>
            </MemberContainer>
            <Button
              style={{ width: "100px" }}
              onClick={() => onClickEditMember(memberInfo.member)}
            >
              Edit Member
            </Button>
          </MemberInfoContainer>
        )}
        <MemberInfoContainer>
          <StyledA href={process.env.REACT_APP_GOOGLE_OAUTH}>
            Add Channel
          </StyledA>
        </MemberInfoContainer>
      </ProfileContainer>
      <TitleSmall>Channels</TitleSmall>
      <ChannelsContainer>
        {memberInfo.channels &&
          memberInfo.channels.map((channel) => (
            <ChannelContainer>
              <Channel key={channel.id} channel={channel} />
              <Button
                style={{ width: "100px" }}
                onClick={() => onClickDeleteChannel(channel.id)}
              >
                delete
              </Button>
            </ChannelContainer>
          ))}
      </ChannelsContainer>
      <TitleSmall>Posts</TitleSmall>
      {postInfo && (
        <PostsContainer>
          {postInfo.map((post) => (
            <PostContainer>
              <PostLink
                href={
                  post.published
                    ? `/posts/${post.id}`
                    : `/posts/${post.id}/progress`
                }
              >
                <PostInfo style={{ fontSize: "26px" }}>{post.title}</PostInfo>
                <PostInfo>
                  uploaded: {timeAgo(new Date(post.createdAt))}
                </PostInfo>
              </PostLink>
              <ButtonContainer>
                <Button onClick={() => onClickEditPost(post)}>edit</Button>
                <Button onClick={() => onClickDeletePost(post.id)}>
                  delete
                </Button>
              </ButtonContainer>
            </PostContainer>
          ))}
        </PostsContainer>
      )}
    </Container>
  );
}

export default Profile;
