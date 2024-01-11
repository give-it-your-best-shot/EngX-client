import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { SlLogin } from "react-icons/sl";
import { Link } from "react-router-dom";

interface LoginProps {
  paragraph: string;
  linkName: string;
  linkUrl?: string;
  titleInput1: string;
  titleInput2: string;
}

export default function Signup({
  paragraph,
  linkName,
  linkUrl = "#",
  titleInput1,
  titleInput2,
}: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex flex-col justify-center items-center gap-4 font-bold text-2xl mb-6 text-gray-800">
          <SlLogin className="text-4xl text-blue-500" />
          Login
          <form onSubmit={() => {}}>
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
