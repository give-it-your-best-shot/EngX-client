import React, { useEffect, useState, useContext } from "react";
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

import { deleteCookie, getCookie } from "cookies-next";
import AcmeLogo from "../../Icon/AcmeLogo";
import { useNavigate } from "react-router-dom";
import http from "../../utils/https";
import EngXAuthService from "../../services/engx_auth_service";
import AuthContext from "../../contexts/AuthContext";

export default function NavigaComponent() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const engx_auth_service = EngXAuthService.getInstance();

  return (
    <>
      <Navbar className="bg-white shadow-lg text-black">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit cursor-pointer" onClick={() => {}}>
            EngX
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="/home" aria-current="page" color="secondary">
              Trang Chủ
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
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
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
                      engx_auth_service.logout().then(() => {
                        deleteCookie("access_token");
                        deleteCookie("refresh_token");
                        setUser(null);
                        navigate("/");
                      });
                    }}
                  >
                    Log Out
                  </DropdownItem>
                )}
                {user == null && (
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={() => {
                      navigate("/");
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
