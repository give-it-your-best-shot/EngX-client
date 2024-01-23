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
import OAuthCallback from "./pages/auth/oauth_callback";
import { FlashCard } from "./pages/flashcard";
import BaseGame from "./pages/game/base";

const BaseLayout = () => {
  return (
    <NextUIProvider>
      <div className="fixed w-full z-40">
        <NavigaComponent />
      </div>
      <div className="bg-fixed overflow-y-auto items-center w-full h-fit min-h-screen bg-slate-100">
        <Outlet />
      </div>
    </NextUIProvider>
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
        path: "/flashcard",
        element: <FlashCard />,
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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/courses/:id/units",
        element: <Unit />,
      },
      {
        path: "/oauth2/callback",
        element: <OAuthCallback />,
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
