import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

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

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0f52ba;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function EditMember() {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEB_SERVER}/members/me`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch member data");
        }
        const memberData = await response.json();
        setFormData({
          name: memberData.name,
        });
        setMemberId(memberData.id);
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };
    fetchMemberData();
  }, []);

  const { name, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/members/${memberId}`,
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
      console.log("Member updated successfully");
      navigate("/profiles");
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Edit Member</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
}

export default EditMember;
