import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonFormal,
  Container,
  ErrorMessage,
  Form,
  FormGroup,
  Input,
  Label,
  TextArea,
  Title,
} from "../../components/Shared";

function Upload() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    videoUrl: "",
  });
  const [error, setError] = useState("");

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
        const msg = await response.json();
        console.log(msg);
        const validationMessage =
          msg.validations && msg.validations[0] && msg.validations[0].message
            ? msg.validations[0].message
            : "";
        setError(`${msg.message} ${validationMessage}`);
        return;
      }
      console.log("Form submitted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonFormal type="submit">Upload</ButtonFormal>
      </Form>
    </Container>
  );
}

export default Upload;
