import App from "../App.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Home from "../pages/Home.jsx";
import Users from "../pages/Users.jsx";
import UserProfile from "../pages/UserProfile.jsx";

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

      // Everything inside this route is protected
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path:"users",
        element:<Users/>,
      },
      {
        path:"users/:id",
        element:<UserProfile/>
      }
    ],
  },
];

export default routes;