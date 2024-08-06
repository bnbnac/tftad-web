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
import Api from "../../tools/Api";

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
      const response = await Api.get("/members/me");
      setMemberInfo(response.data);
    } catch (error) {
      console.error(
        "Error fetching member info:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const fetchPost = async () => {
    try {
      const response = await Api.get("/posts/my");
      setPostInfo(response.data);
    } catch (error) {
      console.error(
        "Error fetching post info:",
        error.response?.data || error.message
      );
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
      await Api.delete(`/posts/${postId}`);
      fetchPost();
      navigate("/profiles");
    } catch (error) {
      console.error(
        "Error delete post:",
        error.response?.data || error.message
      );
    }
  };

  const onClickDeleteChannel = async (channelId) => {
    try {
      await Api.delete(`/channels/${channelId}`);
      fetchMember();
      navigate("/profiles");
    } catch (error) {
      console.error(
        "Error delete channel:",
        error.response?.data || error.message
      );
    }
  };

  if (!memberInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Profile</Title>
      <Button
        style={{ width: "200px", marginBottom: "20px" }}
        onClick={() => navigate("/member/tokens")}
      >
        login device management
      </Button>
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
