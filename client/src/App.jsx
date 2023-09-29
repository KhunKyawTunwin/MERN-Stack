import React from "react";
import "./App.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, Footer, Navbar, Profile } from "./components";

import {
  Add,
  Gig,
  Gigs,
  GigsList,
  Home,
  Login,
  Message,
  Messages,
  MyGigs,
  Orders,
  Pay,
  Possibility,
  Register,
  Success,
  UpdatePost,
  UserLists,
} from "./pages";

function App() {
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
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
          path: "/gigslist",
          element: <GigsList />,
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
          path: "/editgig/:id",
          element: <UpdatePost />,
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
          path: "/mydash",
          element: <Dashboard />,
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
          path: "/pay/:id/:amount",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/profile",
          element: <Profile />,
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
