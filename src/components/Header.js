import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

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
    <header>
      <ul>
        <li>
          <button onClick={onClickSignup}>Signup</button>
        </li>
        <li>
          {isLoggedIn ? (
            <div>
              <button onClick={onClickProfile}>Profile</button>
              <button onClick={onClickLogout}>Logout</button>
              <button onClick={onClickUpload}>Upload</button>
            </div>
          ) : (
            <button onClick={onClickLogin}>Login</button>
          )}
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
