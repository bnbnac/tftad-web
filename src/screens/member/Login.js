import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonFormal,
  Container,
  ErrorMessage,
  Form,
  FormGroup,
  Input,
  Title,
} from "../../components/shared";
import { useAuth } from "../../tools/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/auth/login`,
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
      login();
      navigate("/");
    } catch (error) {
      console.error("login error:", error);
    }

    setFormData({
      password: "",
    });
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Email:</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Password:</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonFormal type="submit">Login</ButtonFormal>
      </Form>
    </Container>
  );
};

export default Login;
