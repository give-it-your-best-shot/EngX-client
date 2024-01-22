// @ts-nocheck
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
} from "@nextui-org/react";
import { deleteCookie } from "cookies-next";
import AcmeLogo from "src/Icon/AcmeLogo";
import { useNavigate } from "react-router-dom";
import AuthService from "src/services/auth_service";

import { useAuthenticationStore } from "src/stores";

export default function NavigaComponent() {
  const navigate = useNavigate();
  const user = useAuthenticationStore((state) => state.user);
  const setUser = useAuthenticationStore((state) => state.setUser);

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
                  src={
                    user
                      ? user.photoURL
                      : "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">
                    @{user ? user.firstName : "Anonymous"} {user?.lastName}
                  </p>
                </DropdownItem>
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

                {user === null && (
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Log In
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
