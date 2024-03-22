import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../components/shared";

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0f52ba;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function Upload() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    videoUrl: "",
  });

  const { title, content, videoUrl } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/posts`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      console.log("Form submitted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
    setFormData({
      title: "",
      content: "",
      videoUrl: "",
    });
  };

  return (
    <Container>
      <Title>Upload</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Content:</Label>
          <TextArea
            name="content"
            value={content}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>URL:</Label>
          <Input
            type="text"
            name="videoUrl"
            value={videoUrl}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Upload</Button>
      </Form>
    </Container>
  );
}

export default Upload;
