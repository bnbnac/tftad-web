import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Subscribes from "./screens/Subscribes";
import OAuth from "./tools/Oauth";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";
import Upload from "./screens/Upload";
import SeePost from "./screens/post/SeePost";
import PostProgress from "./screens/post/PostProgress";

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
      {
        path: "upload",
        element: <Upload />,
        errorElement: <NotFound />,
      },
      {
        path: "posts/:postId",
        element: <SeePost />,
        errorElement: <NotFound />,
      },
      {
        path: "posts/:postId/progress",
        element: <PostProgress />,
        errorElement: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
