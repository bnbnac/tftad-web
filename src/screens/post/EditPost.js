import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextArea,
  ButtonFormal,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Title,
} from "../../components/Shared";
import Question from "../../components/Question";
import styled from "styled-components";

const QuestionsContainer = styled.span`
  display: flex;
  flex-direction: column;
`;

const Block = styled.span`
  display: block;
`;

function EditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { post } = location.state;

  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    questionEdits: [],
  });
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEB_SERVER}/posts/${post.id}/questions`
        );
        const questions = await response.json();
        if (!response.ok) {
          console.log(questions);
          throw new Error("Failed to fetch");
        }
        setQuestions(questions);

        const questionEdits = questions.map((question) => ({
          questionId: question.id,
          authorIntention: question.authorIntention || "",
        }));
        setFormData({ ...formData, questionEdits });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestionEdits = [...formData.questionEdits];
    updatedQuestionEdits[index] = {
      ...updatedQuestionEdits[index],
      authorIntention: value,
    };
    setFormData({ ...formData, questionEdits: updatedQuestionEdits });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/posts/${post.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Failed to update post");
      }
      console.log("Post updated successfully");
      navigate("/profiles");
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  if (!questions) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Edit Post</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label>Content:</Label>
          <TextArea
            name="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
        </FormGroup>

        <QuestionsContainer>
          {questions &&
            questions.map((question, i) => (
              <Block key={i}>
                <Question question={question} i={i} />
                <FormGroup>
                  <Label>authorIntention:</Label>
                  <Input
                    type="text"
                    name={`authorIntention${i}`}
                    value={formData.questionEdits[i].authorIntention}
                    onChange={(e) => handleChange(e, i)}
                  />
                </FormGroup>
              </Block>
            ))}
        </QuestionsContainer>

        <ButtonFormal type="submit">Submit</ButtonFormal>
      </Form>
    </Container>
  );
}

export default EditPost;
