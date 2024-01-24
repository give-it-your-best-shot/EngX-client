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
      navigate("/profile");
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
      <div className="flex justify-center items-center h-screen py-16 mt-3">
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
