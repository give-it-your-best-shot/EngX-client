import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
// import Index from "./routes";
import { NextUIProvider } from "@nextui-org/react";
import Login from "./routes/login";
import Signup from "./routes/signup";
import Word from "./routes/word";
import Home from "./routes/home";
import NavigaComponent from "./components/loading/NavigaComponent";
import Game from "./routes/game";
import Vocab from "./routes/vocab";
import { AuthProvider } from "./contexts/AuthContext";
// import App from "./App";

const NavbarWrapper = () => {
  return (
    <AuthProvider>
      <NextUIProvider>
        <div className="fixed w-full z-40">
          <NavigaComponent />
        </div>
        <div className="bg-fixed overflow-y-auto flex flex-col justify-stretch items-center w-full h-fit min-h-screen bg-slate-100 py-16 pt-32 px-16">
          <Outlet />
        </div>
      </NextUIProvider>
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
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
        path: "/game/:chapterId",
        element: <Game />,
      },
      {
        path: "/home/:id",
        element: <Vocab />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>
);
