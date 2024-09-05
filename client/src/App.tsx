import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// components
import PrivateRoute from "./components/PrivateRoute";
import IfAuthenticated from "./components/IfAuthenticated";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: (
          <IfAuthenticated redirectTo="/">
            <Login />
          </IfAuthenticated>
        ),
      },
      {
        path: "register",
        element: (
          <IfAuthenticated redirectTo="/">
            <Register />
          </IfAuthenticated>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
