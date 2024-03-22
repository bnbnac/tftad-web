import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Title, TitleSmall } from "../../components/shared";

const QuestionsContainer = styled.span`
  display: flex;
  flex-direction: column;
`;

const QuestionContainer = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

const PostInfo = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Video = styled.video`
  width: 100%;
  max-width: 1200px;
  height: auto;
`;

const Line = styled.span`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
`;

const ColumnCover = styled.span`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
`;

function SeePost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEB_SERVER}/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>SeePost</Title>
      <PostInfo>
        <Title>{post.post.title} </Title>
        <ColumnCover>
          <Line>
            <a
              href={`https://www.youtube.com/channel/${post.channel.youtubeChannelId}`}
            >
              author
            </a>
          </Line>
          <Line>
            <a href={`${post.post.videoUrl}`}>풀영상 바로가기</a>
          </Line>
        </ColumnCover>
        <ColumnCover>
          <Line>viewcount</Line>
          <Line>createdAt</Line>
        </ColumnCover>
        <Line>content: {post.post.content}</Line>
      </PostInfo>

      <QuestionsContainer>
        {post.questions &&
          post.questions.map((question, i) => (
            <QuestionContainer>
              <TitleSmall>question {i + 1}</TitleSmall>
              <Video
                id="player"
                controls
                src={`${process.env.REACT_APP_STORAGE_SERVER}/questions/${question.filename}`}
                type="video/mp4"
              ></Video>
              <Line>author intention: {question.authorIntention}</Line>
            </QuestionContainer>
          ))}
      </QuestionsContainer>
    </Container>
  );
}

export default SeePost;
