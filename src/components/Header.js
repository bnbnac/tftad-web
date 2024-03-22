import { useNavigate } from "react-router-dom";
import { useAuth } from "../tools/AuthContext";
import styled from "styled-components";

const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Button = styled.span`
  background-color: #0f52ba;
  border-radius: 3px;
  padding: 3px 3px;
  margin: 0px 3px;
  color: white;
  font-weight: 520;
  cursor: pointer;
`;

const ButtonsContainer = styled.span`
  display: flex;
  align-items: center;
`;

const Logo = styled.span`
  align-items: center;
  display: flex;
  font-size: 40px;
`;

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const onClickUpload = () => {
    navigate("/upload");
  };
  const onClickLogin = () => {
    navigate("/login");
  };
  const onClickLogout = () => {
    logout();
    navigate("/");
  };
  const onClickProfile = () => {
    navigate("/profiles");
  };
  const onClickHome = () => {
    navigate("/");
  };
  const onClickSubscribes = () => {
    navigate("/subscribes");
  };
  const onClickSignup = () => {
    navigate("/signup");
  };

  return (
    <HeaderContainer>
      <Logo>Logo will be here</Logo>
      <ButtonsContainer>
        <Button onClick={onClickHome}>Home</Button>
        {isLoggedIn ? (
          <ButtonsContainer>
            <Button onClick={onClickSubscribes}>Subscribes</Button>
            <Button onClick={onClickProfile}>Profile</Button>
            <Button onClick={onClickLogout}>Logout</Button>
            <Button onClick={onClickUpload}>Upload</Button>
          </ButtonsContainer>
        ) : (
          <ButtonsContainer>
            <Button onClick={onClickLogin}>Login</Button>
            <Button onClick={onClickSignup}>Signup</Button>
          </ButtonsContainer>
        )}
      </ButtonsContainer>
    </HeaderContainer>
  );
}

export default Header;
