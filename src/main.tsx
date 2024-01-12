import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// import Index from "./routes";
import { NextUIProvider } from "@nextui-org/react";
import Login from "./routes/login";
import Signup from "./routes/signup";
import Word from "./routes/word";
import Home from "./routes/home";
// import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/word/:word",
    element: <Word />
  },
  {
    path: "/home",
    element: <Home />
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </NextUIProvider>
  </React.StrictMode>
);
