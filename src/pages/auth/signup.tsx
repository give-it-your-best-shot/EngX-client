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
    window.location.href = `${SERVER_URL}/oauth2/authorization/google`;
  };

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
        </div>
      </div>
    )
  );
}
