import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Root() {
  return (
    <div
      style={{
        backgroundColor: "aqua",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
