import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
  Input,
} from "@nextui-org/react";
import { deleteCookie } from "cookies-next";
import AcmeLogo from "src/Icon/AcmeLogo";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "src/services/auth_service";
import material_service from "src/services/material_service";
import { useAuthenticationStore } from "src/stores";
import SearchIcon from "src/Icon/SearchIcon";
import { useEffect, useState } from "react";
import { Book } from "src/types/book.type";

export default function NavigaComponent() {
  const navigate = useNavigate();
  const user = useAuthenticationStore((state) => state.user);
  const setUser = useAuthenticationStore((state) => state.setUser);
  const [searchBooks, setSearchBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (searchInput) {
        const books =
          await material_service.findAllBooksByNameTyping(searchInput);
        if (books && books.length > 0) {
          setSearchBooks(books);
        }
      } else setSearchBooks([]);
    })();
  }, [searchInput]);

  return (
    <div className="w-full flex items-center justify-between text-blue-gray-900 px-5">
      <div className="flex items-center justify-between w-[15rem]">
        <div className="flex justify-between items-center">
          <AcmeLogo />
          <p
            className="font-bold text-inherit cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            EngX
          </p>
        </div>
        <button onClick={() => navigate("/courses")} color="secondary">
          <p className="font-bold text-medium ">Course</p>
        </button>
      </div>

      <div className="hidden lg:flex w-[30rem]">
        <div className="flex flex-col self-start absolute top-2 w-[25rem]">
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            classNames={{
              base: "max-w-[60rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type a course's name..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <div className="overflow-auto max-h-52 z-10 bg-white divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
            {searchBooks &&
              searchBooks.length > 0 &&
              searchBooks.map((book, index) => (
                <Link
                  key={book.id}
                  to={`/courses/${book.id}`}
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-300"
                  role="menuitem"
                  id="menu-item-0"
                >
                  {book.name}
                </Link>
              ))}
          </div>
        </div>
        <div className="absolute right-5 top-2.5">
          {user === null ? (
            <Button
              color="primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src={user?.photoURL ?? ""}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">
                    @{user ? user.firstName : "Anonymous"} {user?.lastName}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => {
                    AuthService.logout().then((loggedOut) => {
                      if (loggedOut) {
                        deleteCookie("access_token");
                        deleteCookie("refresh_token");
                        setUser(null);
                        navigate("/");
                      }
                    });
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
}
