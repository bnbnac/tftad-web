import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Title } from "../../components/shared";

const Form = styled.form``;

const Input = styled.input``;

const TextArea = styled.textarea``;

const Button = styled.button``;

function EditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { post } = location.state;

  const [formData, setFormData] = React.useState({
    title: post.title,
    content: post.content,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        throw new Error("Failed to update post");
      }
      console.log("Post updated successfully");
      navigate("/profiles");
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  return (
    <Container>
      <Title>Edit Post</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextArea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default EditPost;
