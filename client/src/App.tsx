import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Add from "@pages/Add";
import Gig from "@pages/Gig";
import Gigs from "@pages/Gigs";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Message from "@pages/Message";
import Messages from "@pages/Messages";
import MyGigs from "@pages/MyGigs";
import Orders from "@pages/Orders";
import Pay from "@pages/Pay";
import Register from "@pages/Register";
import Success from "@pages/Success";
import PageNotFound from "@pages/404";

import Layout from "@components/Layout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gigs",
        element: <Gigs />,
      },
      {
        path: "/myGigs",
        element: <MyGigs />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/message/:id",
        element: <Message />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/gig/:id",
        element: <Gig />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/pay/:id",
        element: <Pay />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
