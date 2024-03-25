import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonFormal,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  TextArea,
  Title,
} from "../../components/shared";

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
        <ButtonFormal type="submit">Upload</ButtonFormal>
      </Form>
    </Container>
  );
}

export default Upload;
