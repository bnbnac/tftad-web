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
import Api from "../../tools/Api";

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
      await Api.post("/posts", formData);
      console.log("Form submitted successfully");
      navigate("/");
    } catch (error) {
      const errorResponse = error.response?.data;

      if (errorResponse) {
        const validationMessage =
          errorResponse.validations &&
          errorResponse.validations[0] &&
          errorResponse.validations[0].message
            ? errorResponse.validations[0].message
            : "";

        setError(`${errorResponse.message} ${validationMessage}`);
      } else {
        console.error("Error submitting form:", error.message);
      }
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
