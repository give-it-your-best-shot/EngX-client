import { Button, Input } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { SlLogin } from "react-icons/sl";
import { Link } from "react-router-dom";
import { hasCookie, setCookie } from "cookies-next";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import EngXAuthService, { LoginReponse } from "../services/engx_auth_service";
import AuthContext from "../contexts/AuthContext";

interface LoginProps {
  paragraph?: string;
  linkName?: string;
  linkUrl?: string;
  titleInput1?: string;
  titleInput2?: string;
}

export default function Login({
  paragraph = "Don't have an account yet?",
  linkName = "Sign up",
  linkUrl = "/signup",
  titleInput1 = "Username",
  titleInput2 = "Password",
}: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const engx_auth_service = EngXAuthService.getInstance();
  const [loginFail, setLoginFail] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      navigate("/home");
      return;
    }
  }, [navigate, user]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await engx_auth_service.login(username, password);
    console.log(response);
    if (response.status == 403) {
      setLoginFail(true);
      return;
    }
    const d: LoginReponse = await response.json();
    setCookie("access_token", d.access_token, {
      maxAge: 60 * 60 * 24 * 7,
    });
    setCookie("refresh_token", d.refresh_token, {
      maxAge: 60 * 60 * 24 * 7,
    });
    engx_auth_service.getUser().then(user => {
      setUser(user);
      navigate("/home");
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  return (
    user == null && (
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="flex flex-col justify-center items-center gap-4 font-bold text-2xl mb-6 text-gray-800">
            <SlLogin className="text-4xl text-blue-500" />
            Login
            <form onSubmit={handleLogin}>
              <div className="flex justify-center">
                <p className={`${!loginFail && "hidden"} text-danger-500 font-thin text-base pb-3`}>
                  Wrong username or password
                </p>
              </div>

              <Input
                isRequired
                type="text"
                label={titleInput1}
                value={username}
                className="mb-5 h-12 mr-32"
                onChange={e => {
                  const value = handleInputChange(e);
                  setUsername(value);
                }}
              />

              <Input
                isRequired
                type="password"
                label={titleInput2}
                value={password}
                className="mb-5 h-12 mr-32"
                onChange={e => {
                  const value = handleInputChange(e);
                  setPassword(value);
                }}
              />
              <p className="text-center text-sm text-gray-600 mt-5">
                {paragraph}{" "}
                <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                  {linkName}
                </Link>
              </p>
              <div className="mt-4 flex justify-around">
                <Button color="primary" type="submit" className="font-bold">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
