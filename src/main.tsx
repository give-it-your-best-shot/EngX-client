import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Index from "./routes";
import { NextUIProvider } from "@nextui-org/react";
import Login from "./routes/login";
import Signup from "./routes/signup";
import Word from "./routes/word";
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
  },
  {
    path: "/word/:word",
    element: <Word />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        <RouterProvider router={router} />
      </div>
    </NextUIProvider>
  </React.StrictMode>
);
