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
} from "../../components/Shared";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    code: "",
  });
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendCode = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/code/mail`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
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
      console.log("Authentication code sent successfully");
    } catch (error) {
      console.error("Error sending authentication code:", error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/code/mail/verification`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: formData.code,
            email: formData.email,
          }),
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
      console.log("Authentication code verified successfully");
      setIsVerified(true);
    } catch (error) {
      console.error("Error verifying authentication code:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      setError("이메일을 인증해주세요");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_WEB_SERVER}/auth/signup`,
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
      <Title>Signup</Title>
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
          <ButtonFormal
            style={{ marginTop: "10px" }}
            type="button"
            onClick={handleSendCode}
          >
            Send Verification Code
          </ButtonFormal>
        </FormGroup>
        <FormGroup>
          <label>Verification Code:</label>
          <Input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
          <ButtonFormal
            style={{ marginTop: "10px" }}
            type="button"
            onClick={handleVerifyCode}
          >
            Verify Code
          </ButtonFormal>
        </FormGroup>
        <FormGroup>
          <label>Name:</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
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
        <ButtonFormal type="submit">Signup</ButtonFormal>
      </Form>
    </Container>
  );
};

export default Signup;
