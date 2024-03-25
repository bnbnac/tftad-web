import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Container,
  StyledA,
  Title,
  TitleSmall,
} from "../../components/shared";
import Channel from "../../components/Channel";
import { timeAgo } from "../../tools/Util";
import Question from "../../components/Question";

const QuestionsContainer = styled.span`
  display: flex;
  flex-direction: column;
`;

const Block = styled.span`
  display: block;
`;

const PostInfo = styled.span`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid darkorchid;
  padding: 20px;
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
  align-items: center;
`;

const RowCover = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 5px;
  margin-left: 10px;
`;

function SeePost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [channel, setChannel] = useState(null);
  const [showAuthorIntention, setShowAuthorIntention] = useState(false);

  const toggleAuthorIntention = (index) => {
    setShowAuthorIntention((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

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
        setPost(data.post);
        setQuestions(data.questions);
        setChannel(data.channel);

        const initialState = {};
        data.questions.forEach((question, index) => {
          initialState[index] = false;
        });
        setShowAuthorIntention(initialState);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [postId]);

  if (!(post && questions && channel)) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title style={{ fontSize: "26px" }}>{post.title}</Title>
      <PostInfo>
        <ColumnCover>
          <Channel channel={channel} />
          <RowCover>
            <Line>uploaded: {timeAgo(new Date(post.createdAt))}</Line>
          </RowCover>
          <Line>
            <StyledA style={{ width: "120px" }} href={`${post.videoUrl}`}>
              Full Video
            </StyledA>
          </Line>
        </ColumnCover>
        <Line style={{ fontSize: "18px", fontFamily: "sans-serif" }}>
          content: {post.content}
        </Line>
      </PostInfo>

      <QuestionsContainer>
        {questions &&
          questions.map((question, i) => (
            <Block>
              <Question question={question} i={i} />
              <Button
                onClick={() => toggleAuthorIntention(i)}
                style={{ width: "150px" }}
              >
                {showAuthorIntention[i] ? "Hide" : "Show"} author intention
              </Button>
              {showAuthorIntention[i] ? (
                <Block>Author intention: {question.authorIntention}</Block>
              ) : (
                <Block> </Block>
              )}
            </Block>
          ))}
      </QuestionsContainer>
    </Container>
  );
}

export default SeePost;
