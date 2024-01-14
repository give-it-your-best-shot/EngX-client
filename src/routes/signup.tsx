import { Button, Input } from "@nextui-org/react";
import { hasCookie } from "cookies-next";
import { FormEvent, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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
}: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  useEffect(() => {
    if (hasCookie("token")) {
      navigate("/home");
      return;
    }
  }, [navigate]);

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers: Headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    fetch(process.env.BACKEND_URL + `auth/register`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        firstname: titleInput1,
        lastname: titleInput2,
        username: titleInput3,
        password: titleInput4,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.status == 200) {
          navigate("/");
        } else {
          console.log(d.error.message)
        }
      });
  };

  return (
    <div className="bg-fixed overflow-y-auto flex justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="flex flex-col justify-center items-center gap-4 font-bold text-2xl mb-6 text-gray-800">
            <FaUserPlus className="text-4xl text-blue-500" />
            Login
            <form onSubmit={handleRegister}>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  isRequired
                  type="text"
                  label={titleInput1}
                  value={username}
                  className="mb-5 h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setUsername(value);
                  }}
                />
                <Input
                  isRequired
                  type="text"
                  label={titleInput2}
                  value={password}
                  className="mb-5 h-12"
                  onChange={(e) => {
                    const value = handleInputChange(e);
                    setPassword(value);
                  }}
                />
              </div>
              <Input
                isRequired
                type="text"
                label={titleInput3}
                value={firstname}
                className="mb-5 h-12 mr-32"
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setFirstname(value);
                }}
              />

              <Input
                isRequired
                type="password"
                label={titleInput4}
                value={lastname}
                className="mb-5 h-12 mr-32"
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setLastname(value);
                }}
              />
              <p className="mt-2 text-center text-sm text-gray-600 mt-5">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
