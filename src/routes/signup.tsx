import { Button, Input } from "@nextui-org/react";
import { hasCookie } from "cookies-next";
import { FormEvent, useEffect, useState, useContext } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import EngXAuthService, { LoginReponse } from "../services/engx_auth_service";
import { getCookie, setCookie } from "cookies-next";
import AuthContext from "../contexts/AuthContext";

interface LoginProps {
  paragraph?: string;
  linkName?: string;
  linkUrl?: string;
  titleInput1?: string;
  titleInput2?: string;
  titleInput3?: string;
  titleInput4?: string;
}

export default function Signup({
  paragraph = "Already have an account?",
  linkName = "Login",
  linkUrl = "/",
  titleInput1 = "First Name",
  titleInput2 = "Last Name",
  titleInput3 = "Username",
  titleInput4 = "Password",
  titleInput5 = "Retype Password",
}: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [error, setError] = useState<String>("");
  const engx_auth_service = EngXAuthService.getInstance();
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const value = e.target.value;
    return value;
  };

  // useEffect(() => {
  //   if (hasCookie("token")) {
  //     navigate("/home");
  //     return;
  //   }
  // }, [navigate]);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (retypePassword != password) {
      setError("Password not match");
      return;
    }
    const response = await engx_auth_service.register(firstname, lastname, username, password);
    if (response.status != 200) {
      setError("Username existed");
      return;
    }
    const d = await response.json();
    console.log(d);
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

  return (
    <div className="flex justify-center items-center pt-32 py-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex flex-col justify-center items-center gap-4 font-bold text-2xl mb-6 text-gray-800">
          <FaUserPlus className="text-4xl text-blue-500" />
          Sign Up
          <form onSubmit={handleRegister}>
            <div className="flex justify-center">
              <p className={`${!error && "hidden"} text-danger-500 font-thin text-base pb-3`}>{error}</p>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                isRequired
                type="text"
                label={titleInput1}
                value={firstname}
                className="mb-5 h-12"
                onChange={e => {
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
                onChange={e => {
                  const value = handleInputChange(e);
                  setLastname(value);
                }}
              />
            </div>
            <Input
              isRequired
              type="text"
              label={titleInput3}
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
              label={titleInput4}
              value={password}
              className="mb-5 h-12 mr-32"
              onChange={e => {
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
              onChange={e => {
                const value = handleInputChange(e);
                setRetypePassword(value);
              }}
            />
            <p className="mt-2 text-center text-sm text-gray-600">
              {paragraph}{" "}
              <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
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
          </form>
        </div>
      </div>
    </div>
  );
}
