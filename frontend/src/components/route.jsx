import App from "../App.jsx";
import Register from "../pages/Register.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Register/>,
      },
      {
        path: "login",
        element: <Register />,
      },
    ],
  },
];

export default routes;