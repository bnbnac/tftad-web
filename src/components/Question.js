import { TitleSmall } from "./Shared";
import styled from "styled-components";

const QuestionContainer = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

const Video = styled.video`
  width: 100%;
  max-width: 1200px;
  height: auto;
`;

const Question = ({ question, i }) => {
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionContainer>
      <TitleSmall>question {i + 1}</TitleSmall>
      <Video
        id="player"
        controls
        src={`${process.env.REACT_APP_STORAGE_SERVER}/questions/${question.filename}`}
        type="video/mp4"
      ></Video>
    </QuestionContainer>
  );
};

export default Question;
