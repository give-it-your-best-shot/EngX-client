import React, { useEffect } from "react";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import NavigaComponent from "src/components/loading/NavigaComponent";
import { useAuthenticationStore } from "./stores";
import auth_service from "./services/auth_service";
import { deleteCookie, setCookie } from "cookies-next";
import { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from "./utils/const";
import { Login, Signup } from "./pages/auth";
import { BookPage, Vocab, Unit } from "./pages/material";
import { Profile } from "./pages/profile";
import { LandingPage } from "./pages/landingPage";
import { CreateBook } from "./pages/flashcard";
import { CreateUnit } from "./pages/flashcard";
import BaseGame from "./pages/game/base";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Flashcard } from "./pages/flashcard";
import EditBook from "./pages/flashcard/EditBook";
import UnitGame from "./pages/game/unit_game";

const BaseLayout = () => {
  return (
    <GoogleOAuthProvider clientId="715345910762-d45r71gu26i7ncjg7uuqabd9otatdblc.apps.googleusercontent.com">
      <NextUIProvider>
        <div className="fixed w-full z-40">
          <NavigaComponent />
        </div>
        <div className="bg-fixed overflow-y-auto items-center w-full h-fit min-h-screen bg-slate-100">
          <Outlet />
        </div>
      </NextUIProvider>
    </GoogleOAuthProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/createBook",
        element: <CreateBook />,
      },
      {
        path: "/flashcard",
        element: <Flashcard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/courses",
        element: <BookPage />,
      },
      {
        path: "/game/:chapterId",
        element: <BaseGame />,
      },
      {
        path: "/units/:id/words",
        element: <Vocab />,
      },
      {
        path: "/units/:unitId/game",
        element: <UnitGame />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/courses/:id",
        element: <Unit />,
      },
      {
        path: "/courses/:id/edit",
        element: <EditBook />,
      },
      {
        path: "/courses/:id/create-unit",
        element: <CreateUnit />,
      },
    ],
  },
]);

const App: React.FC = () => {
  const setUser = useAuthenticationStore((state) => state.setUser);
  const user = useAuthenticationStore((state) => state.user);

  useEffect(() => {
    (async () => {
      const payload = await auth_service.getUser();
      if (payload) {
        setUser(payload);
      } else {
        const payload = await auth_service.refresh();
        if (payload) {
          const { access_token, refresh_token, auth_user } = payload;
          setCookie("access_token", access_token, {
            maxAge: ACCESS_TOKEN_EXPIRE,
          });
          setCookie("refresh_token", refresh_token, {
            maxAge: REFRESH_TOKEN_EXPIRE,
          });
          setUser(auth_user);
        } else {
          setUser(null);
        }
      }
    })();
  }, [setUser]);

  useEffect(() => {
    if (user === null) {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
    }
  }, [user]);

  return <RouterProvider router={router} />;
};

export default App;
