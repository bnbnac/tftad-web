import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Root() {
  return (
    <div
      style={{
        backgroundColor: "mintcream",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
