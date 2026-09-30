import App from "../App.jsx";

import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Users from "../pages/Users.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import Followers from "../pages/Followers.jsx";
import Following from "../pages/Following.jsx";
import EditProfile from "../pages/EditProfile.jsx";
import FollowRequests from "../pages/FollowRequest.jsx";

import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AuthenticatedLayout from "../components/AuthenticatedLayout.jsx";
import PostDetails from "../pages/postDetails.jsx";

const routes = [
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "register",
        element: <Register />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        element: <ProtectedRoute />,

        children: [
          {
            element: <AuthenticatedLayout />,

            children: [
              {
                index: true,
                element: <Home />,
              },

              {
                path: "users",
                element: <Users />,
              },

              {
                path: "users/:id",
                element: <UserProfile />,
              },

              {
                path: "users/:id/followers",
                element: <Followers />,
              },

              {
                path: "users/:id/following",
                element: <Following />,
              },
              {
                path:"posts/:id",
                element:<PostDetails/>
              },

              {
                path: "edit-profile",
                element: <EditProfile />,
              },

              {
                path: "follow-requests",
                element: <FollowRequests />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;