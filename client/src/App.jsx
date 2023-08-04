import "./App.scss";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import {
  Add,
  Gig,
  Gigs,
  Login,
  Message,
  Messages,
  MyGigs,
  Orders,
  Pay,
  Register,
  Success,
} from "./pages";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Possibility from "./pages/possibility/Possibility";
import UserLists from "./pages/userLists/UserLists";

function App() {
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <React.StrictMode>
        <div className="app">
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Outlet />
            <Footer />
          </QueryClientProvider>
        </div>
      </React.StrictMode>
    );
  };

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
          path: "/business",
          element: <Possibility />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/userslists",
          element: <UserLists />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/mygigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "message/:id",
          element: <Message />,
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
      ],
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
