import { Button, Input } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "src/services/auth_service";
import { setCookie } from "cookies-next";
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
  titleInput3?: string;
  titleInput4?: string;
  titleInput5?: string;
}

export default function Signup({
  paragraph = "Already have an account?",
  linkName = "Login",
  linkUrl = "/login",
  titleInput1 = "First Name",
  titleInput2 = "Last Name",
  titleInput3 = "Email",
  titleInput4 = "Password",
  titleInput5 = "Retype Password",
}: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [error, setError] = useState<string>("");
  const setUser = useAuthenticationStore((state) => state.setUser);
  const user = useAuthenticationStore((state) => state.user);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const value = e.target.value;
    return value;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (retypePassword != password) {
      setError("Password not match");
      return;
    }
    const payload = await AuthService.register(
      firstname,
      lastname,
      email,
      password
    );
    if (payload) {
      const { access_token, refresh_token, auth_user } = payload;
      setCookie("access_token", access_token, {
        maxAge: ACCESS_TOKEN_EXPIRE,
      });
      setCookie("refresh_token", refresh_token, {
        maxAge: REFRESH_TOKEN_EXPIRE,
      });
      setUser(auth_user);
      navigate("/");
    } else {
      setError("Email existed");
      return;
    }
  };

  const handleGoogleButtonClick = () => {
<<<<<<< HEAD
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="flex justify-center items-center py-10 mt-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex flex-col justify-center items-center gap-4 font-bold text-2xl mb-6 text-gray-800">
          <FaUserPlus className="text-4xl text-blue-500" />
          Sign Up
          <form onSubmit={handleRegister}>
            <div className="flex justify-center">
              <p
                className={`${!error && "hidden"} text-danger-500 font-thin text-base pb-3`}
              >
                {error}
              </p>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                isRequired
                type="text"
                label={titleInput1}
                value={firstname}
                className="mb-5 h-12"
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setFirstname(value);
                }}
              />
              <Input
                isRequired
                type="text"
                label={titleInput2}
                value={lastname}
                className="mb-5 h-12"
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setLastname(value);
                }}
              />
            </div>
            <Input
              isRequired
              type="text"
              label={titleInput3}
              value={email}
              className="mb-5 h-12 mr-32"
              onChange={(e) => {
                const value = handleInputChange(e);
                setEmail(value);
              }}
            />
=======
    window.location.href = `${SERVER_URL}/oauth2/authorization/google`;
  };
>>>>>>> 48b30514e7aebedb7774ae201e7c68108840ce5b

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    user === null && (
      <div className="flex justify-center items-center py-10 mt-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="flex flex-col justify-center items-center gap-4 font-bold text-2xl mb-6 text-gray-800">
            <FaUserPlus className="text-4xl text-blue-500" />
            Sign Up
            <form onSubmit={handleRegister}>
              <div className="flex justify-center">
                <p
                  className={`${!error && "hidden"} text-danger-500 font-thin text-base pb-3`}
                >
                  {error}
                </p>
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  isRequired
                  type="text"
                  label={titleInput1}
                  value={firstname}
                  className="mb-5 h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setFirstname(value);
                  }}
                />
                <Input
                  isRequired
                  type="text"
                  label={titleInput2}
                  value={lastname}
                  className="mb-5 h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setLastname(value);
                  }}
                />
              </div>
              <Input
                isRequired
                type="text"
                label={titleInput3}
                value={email}
                className="mb-5 h-12 mr-32"
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setEmail(value);
                }}
<<<<<<< HEAD
              >
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Sign up
              </Button>
            </div>
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
          </form>
=======
              />

              <Input
                isRequired
                type="password"
                label={titleInput4}
                value={password}
                className="mb-5 h-12 mr-32"
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setPassword(value);
                }}
              />
              <Input
                isRequired
                type="password"
                label={titleInput5}
                value={retypePassword}
                className="mb-5 h-12 mr-32"
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setRetypePassword(value);
                }}
              />
              <p className="mt-2 text-center text-sm text-gray-600">
                {paragraph}{" "}
                <Link
                  to={linkUrl}
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  {linkName}
                </Link>
              </p>
              <div className="mt-4 flex justify-around">
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Sign up
                </Button>
              </div>
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
            </form>
          </div>
>>>>>>> 48b30514e7aebedb7774ae201e7c68108840ce5b
        </div>
      </div>
    )
  );
}
