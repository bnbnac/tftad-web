import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  ButtonContainer,
  Container,
  PostContainer,
  Title,
  TitleSmall,
} from "../components/shared";

const Image = styled.img`
  height: 60px;
  border-radius: 50px;
`;

const Button = styled.button`
  width: 60px;
  background-color: #0f52ba;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin: 3px;
  margin-left: 10px;
  cursor: pointer;
`;

const MemberContainer = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  margin-right: 30px;
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

const ChannelContainer = styled.span`
  border: 1px solid darkorchid;
  display: flex;
  width: 300px;
  border-radius: 5px;
  background-color: mintcream;
  margin: 10px;
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

const StyledA = styled.a`
  display: flex;
  margin-bottom: 5px;
  margin-right: 30px;
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

  const onClickEditPost = (post) => {
    navigate(`/posts/edit/${post.id}`, { state: { post } });
  };

  const onClickEditMember = () => {
    navigate(`/members/edit`);
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
        throw new Error("Failed to delete post");
      }
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
        throw new Error("Failed to delete post");
      }
      navigate("/profiles");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!(memberInfo && postInfo)) {
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
                Name: {memberInfo.name}
              </MemberInfo>
              <MemberInfo style={{ fontSize: "16px" }}>
                Email: {memberInfo.email}
              </MemberInfo>
            </MemberContainer>
            <Button style={{ width: "100px" }} onClick={onClickEditMember}>
              Edit Member
            </Button>
          </MemberInfoContainer>
        )}
        <StyledA href={process.env.REACT_APP_GOOGLE_OAUTH}>
          Google Login
        </StyledA>
        <Button style={{ width: "100px" }} onClick={handleAddChannel}>
          -- CONFIRM Add Channel
        </Button>
      </ProfileContainer>
      <TitleSmall>Channels</TitleSmall>
      <ChannelsContainer>
        {memberInfo.channels &&
          memberInfo.channels.map((channel, index) => (
            <ChannelContainer>
              <StyledA
                href={`https://www.youtube.com/channel/${channel.youtubeChannelId}`}
              >
                <MemberInfo style={{ margin: "10px" }}>
                  <Image src={`${channel.thumbnail}`} />
                </MemberInfo>
                <MemberInfo style={{ margin: "10px" }}>
                  {channel.title}
                </MemberInfo>
              </StyledA>
              <Button onClick={() => onClickDeleteChannel(channel.id)}>
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
                <PostInfo style={{ fontSize: "16px" }}>{post.title}</PostInfo>
                <PostInfo>게시일</PostInfo>
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
