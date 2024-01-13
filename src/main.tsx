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
import NavigaComponent from "./components/loading/NavigaComponent";
import Game from "./routes/game";
// import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/word/:word",
    element: <Word />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <NextUIProvider>
    <div className="fixed w-full z-40">
      <NavigaComponent />
    </div>
    <div className="bg-fixed overflow-y-auto flex justify-center items-center w-full min-h-screen bg-slate-100 px-8 py-16">
      <div className="h-[calc(100vh-10rem)] w-full">
        <RouterProvider router={router} />
      </div>
    </div>
  </NextUIProvider>
  // </React.StrictMode>
);
