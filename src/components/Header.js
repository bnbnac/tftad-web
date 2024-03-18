import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const onClickAuth = () => {
    if (isLoggedIn) {
      navigate("/profiles");
    } else {
      navigate("/login");
    }
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
    <header>
      <ul>
        <li>
          <button onClick={onClickSignup}>Signup</button>
        </li>
        <li>
          <button onClick={onClickAuth}>Auth:LOGIN?OR?PROFILE</button>
        </li>
        <li>
          <button onClick={onClickHome}>Home</button>
        </li>
        <li>
          <button onClick={onClickSubscribes}>Subscribes</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
