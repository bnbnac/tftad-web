import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../../components/shared";

function SeePost() {
  const SeePostContainer = styled.span`
    display: flex;
    flex-direction: column;
  `;

  const QuestionsContainer = styled.span`
    display: flex;
    flex-direction: column;
  `;

  const QuestionContainer = styled.span`
    display: flex;
    flex-direction: column;
  `;

  const PostInfo = styled.span`
    display: flex;
    flex-direction: column;
  `;

  const Video = styled.video`
    width: 100%;
    max-width: 1200px;
    height: auto;
  `;

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
    <SeePostContainer>
      <Title>SeePost</Title>
      <PostInfo>
        Here will be Post info. author, viewcount, videolink: {post.videoUrl},
        channelLink, ptitle: {post.title}, pcontent: {post.content}
      </PostInfo>

      <QuestionsContainer>
        {post.questions &&
          post.questions.map((question) => (
            <QuestionContainer>
              <Video
                id="player"
                controls
                src={`${process.env.REACT_APP_STORAGE_SERVER}/questions/${question.filename}`}
                type="video/mp4"
              ></Video>
              <Link to={`answer/${question.id}`}>see answer</Link>
              <Outlet context={{ authorIntention: question.authorIntention }} />
            </QuestionContainer>
          ))}
      </QuestionsContainer>
    </SeePostContainer>
  );
}

export default SeePost;
