import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SlLogin } from "react-icons/sl";
import { Link } from "react-router-dom";
import { setCookie } from "cookies-next";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import AuthService from "src/services/auth_service";
import { useAuthenticationStore } from "src/stores";
import {
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_EXPIRE,
  SERVER_URL,
} from "src/utils/const";
import { GoogleLogin } from "@react-oauth/google";
import auth_service from "src/services/auth_service";
interface LoginProps {
  paragraph?: string;
  linkName?: string;
  linkUrl?: string;
  titleInput1?: string;
  titleInput2?: string;
}

export default function Login({
  paragraph = "Don't have an account yet? ",
  linkName = "Sign up",
  linkUrl = "/signup",
  titleInput1 = "Email",
  titleInput2 = "Password",
}: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const setUser = useAuthenticationStore((state) => state.setUser);
  const user = useAuthenticationStore((state) => state.user);
  const [loginFail, setLoginFail] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, [navigate, user]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = await AuthService.login(email, password);
    if (payload) {
      const { access_token, refresh_token, auth_user } = payload;
      setCookie("access_token", access_token, {
        maxAge: ACCESS_TOKEN_EXPIRE,
      });
      setCookie("refresh_token", refresh_token, {
        maxAge: REFRESH_TOKEN_EXPIRE,
      });
      setUser(auth_user);
      navigate("/courses");
    } else {
      setLoginFail(true);
      return;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFail(false);
    const value = e.target.value;
    return value;
  };

  const handleGoogleButtonClick = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    user === null && (
      <div className="flex justify-center items-center h-full py-16 mt-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="flex flex-col justify-center items-center gap-4 font-bold text-2xl mb-6 text-gray-800">
            <SlLogin className="text-4xl text-blue-500" />
            Login
            <form onSubmit={handleLogin}>
              <div className="flex justify-center">
                <p
                  className={`${!loginFail && "hidden"} text-danger-500 font-thin text-base pb-3`}
                >
                  Wrong email or password
                </p>
              </div>

              <Input
                isRequired
                type="email"
                label={titleInput1}
                value={email}
                required
                className="mb-5 h-12 mr-32"
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setEmail(value);
                }}
              />

              <Input
                isRequired
                type="password"
                label={titleInput2}
                value={password}
                required
                className="mb-5 h-12 mr-32"
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setPassword(value);
                }}
              />
              <p className="text-center text-sm text-gray-600 mt-5">
                {paragraph}
                <Link
                  to={linkUrl}
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  {linkName}
                </Link>
              </p>
              <div className="mt-4 flex justify-around">
                <Button color="primary" type="submit" className="font-bold">
                  Login
                </Button>
              </div>
<<<<<<< HEAD
              <button
                onClick={handleGoogleButtonClick}
                className="flex ml-10 mt-6 items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="800px"
                  height="800px"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  {" "}
                  <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                  <defs> </defs>{" "}
                  <g id="Icons" stroke="none" fill="none">
                    {" "}
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      {" "}
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        {" "}
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </svg>
                <span>Continue with Google</span>
              </button>
=======
              <div className="flex justify-center items-center gap-2 my-2 w-full flex-row">
                <hr className="w-full"></hr>
                <p className="text-sm font-normal">Or</p>
                <hr className="w-full"></hr>
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={async (response) => {
                    const payload = await auth_service.googleAuth(
                      response.credential,
                    );
                    if (payload) {
                      const { access_token, refresh_token, auth_user } =
                        payload;
                      setCookie("access_token", access_token, {
                        maxAge: ACCESS_TOKEN_EXPIRE,
                      });
                      setCookie("refresh_token", refresh_token, {
                        maxAge: REFRESH_TOKEN_EXPIRE,
                      });
                      setUser(auth_user);
                      navigate("/home");
                    } else {
                      return;
                    }
                  }}
                />
              </div>
>>>>>>> 48b30514e7aebedb7774ae201e7c68108840ce5b
            </form>
          </div>
        </div>
      </div>
    )
  );
}
