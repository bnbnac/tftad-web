import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ButtonFormal,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Title,
} from "../../components/Shared";
import Api from "../../tools/Api";

function EditMember() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name: memberName, id: memberId } = location.state.member;

  const [formData, setFormData] = useState({
    name: memberName,
    password: "",
  });

  const { name, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.patch(`/members/${memberId}`, formData);
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
          <Input type="text" name="name" value={name} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </FormGroup>
        <ButtonFormal type="submit">Save Changes</ButtonFormal>
      </Form>
    </Container>
  );
}

export default EditMember;
