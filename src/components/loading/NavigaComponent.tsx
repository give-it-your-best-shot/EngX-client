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

  console.log(user);

  return (
    <>
      <Navbar className="bg-white shadow-lg text-black">
        <NavbarBrand>
          <AcmeLogo />
          <p
            className="font-bold text-inherit cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            EngX
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="/course" aria-current="page" color="secondary">
              Course
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Input
            classNames={{
              base: "max-w-[20rem] sm:max-w-60 h-10",
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
          {user === null ? (
            <NavbarItem>
              <Button
                color="primary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                {" "}
                Login{" "}
              </Button>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src={user?.photoURL}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">
                      @{user ? user.firstName : "Anonymous"} {user?.lastName}
                    </p>
                  </DropdownItem>
                </DropdownMenu>
                {user && (
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
                )}
              </Dropdown>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}
