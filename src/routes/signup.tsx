import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  return (
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="flex flex-col justify-center items-center gap-4 font-bold text-2xl mb-6 text-gray-800">
            <FaUserPlus className="text-4xl text-blue-500" />
            Login
            <form onSubmit={() => {}}>
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
                  type="password"
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
                label={titleInput4}
                value={password}
                className="mb-5 h-12 mr-32"
                onChange={(e) => {
                  const value = handleInputChange(e);
                  setPassword(value);
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
            </form>
          </div>
        </div>
      </div>
  );
}
