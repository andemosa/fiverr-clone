import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

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
import ProtectedRoute from "@components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="gigs" element={<Gigs />} />
      <Route path="gig/:id" element={<Gig />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="orders" element={<Orders />} />
        <Route path="messages" element={<Messages />} />
        <Route path="messages/:id" element={<Message />} />
        <Route path="pay/:id" element={<Pay />} />
        <Route path="success" element={<Success />} />
        <Route path="mygigs" element={<MyGigs />} />
        <Route path="add" element={<Add />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
