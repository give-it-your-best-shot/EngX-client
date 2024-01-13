import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SlLogin } from "react-icons/sl";
import { Link } from "react-router-dom";
import { hasCookie, setCookie } from "cookies-next";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (hasCookie("access_token")) {
      navigate("/home");
      return;
    }
  }, [navigate]);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers: Headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    fetch(process.env.BACKEND_URL + "/auth/authenticate", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username: titleInput1,
        password: titleInput2,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.code == 200) {
          setCookie("access_token", d.data.access_token, {
            maxAge: 60 * 60 * 24 * 7,
          });
          setCookie("refresh_token", d.data.refresh_token, {
            maxAge: 60 * 60 * 24 * 7,
          });
          navigate("/home");
        } else {
          console.log("Error: " + d.error);
        }
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  return (
    <div className="bg-fixed overflow-y-auto flex justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="flex flex-col justify-center items-center gap-4 font-bold text-2xl mb-6 text-gray-800">
            <SlLogin className="text-4xl text-blue-500" />
            Login
            <form
              onSubmit={() => {
                handleLogin;
              }}
            >
              <Input
                isRequired
                type="text"
                label={titleInput1}
                value={username}
                className="mb-5 h-12 mr-32"
                onChange={(e) => {
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
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setPassword(value);
                }}
              />
              <p className="text-center text-sm text-gray-600 mt-5">
                {paragraph}{" "}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
