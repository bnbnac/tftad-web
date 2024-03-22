import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Subscribes from "./screens/Subscribes";
import OAuth from "./tools/Oauth";
import Login from "./screens/member/Login";
import Profile from "./screens/member/Profile";
import Signup from "./screens/member/Signup";
import Upload from "./screens/post/Upload";
import SeePost from "./screens/post/SeePost";
import PostProgress from "./screens/post/PostProgress";
import EditPost from "./screens/post/EditPost";
import EditMember from "./screens/member/EditMember";

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
      {
        path: "posts/edit/:postId",
        element: <EditPost />,
        errorElement: <NotFound />,
      },
      {
        path: "members/edit",
        element: <EditMember />,
        errorElement: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
