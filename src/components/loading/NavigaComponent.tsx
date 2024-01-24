import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
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
import { useNavigate } from "react-router-dom";
import AuthService from "src/services/auth_service";

import { useAuthenticationStore } from "src/stores";
import SearchIcon from "src/Icon/SearchIcon";

export default function NavigaComponent() {
  const navigate = useNavigate();
  const user = useAuthenticationStore((state) => state.user);
  const setUser = useAuthenticationStore((state) => state.setUser);

  return (
    <div className="w-full flex items-center justify-between text-blue-gray-900 px-5">
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
      <div className="hidden lg:flex w-[5rem]">
        <div className="flex flex-col self-start absolute top-2 w-[18rem]">
          <Input
            classNames={{
              base: "max-w-[60rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type a course, email..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <div className="hidden z-10 bg-white divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-0"
            >
              Account settings
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-1"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-2"
            >
              License
            </a>
          </div>
        </div>
      </div>

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
  );
}
