import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Index from "./routes";
import { NextUIProvider } from "@nextui-org/react";
import Login from "./routes/login";
import Signup from "./routes/Signup";
// import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
      {/* <App/> */}
    </NextUIProvider>
  </React.StrictMode>
);
