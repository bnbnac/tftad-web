import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Subscribes from "./screens/Subscribes";
import OAuth from "./components/auth/Oauth";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: "subscribes",
        element: <Subscribes />,
        errorElement: <NotFound />,
      },
      {
        path: "signup",
        element: <Signup />,
        errorElement: <NotFound />,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <NotFound />,
      },
      {
        path: "profiles",
        element: <Profile />,
        errorElement: <NotFound />,
      },
      {
        path: "oauth/login/google",
        element: <OAuth />,
        errorElement: <NotFound />,
      },
      // {
      //   path: "questions/:questionId",
      //   element: <Question />,
      //   children: [
      //     {
      //       path: "answer",
      //       element: <Answer />,
      //     },
      //   ],
      // },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
