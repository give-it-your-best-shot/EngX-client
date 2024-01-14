import React, { useEffect, useState } from "react";
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

export default function NavigaComponent() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const engx_auth_service = EngXAuthService.getInstance();

  useEffect(() => {
    engx_auth_service.getUser()
      .then(user => {
        if(user) {
          console.log(user)
          setFirstname(user.firstName)
          setLastname(user.lastName)
        }
      })
    // async function fetchData() {
    //   try {
    //     const token = getCookie("access_token")?.toString();
    //     const response = await http.get(`chapters`, {
    //       headers: {
    //         Authorization: `${token}`,
    //       },
    //     });

    //     if (response.status === 200) {
    //       setFirstname(response.data.user.firstname);
    //       setLastname(response.data.user.lastname);
    //       console.log(response.data.user);
    //     } else {
    //       console.log("Loi he thong");
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // }

    // fetchData();
  }, []);

  return (
    <>
      <Navbar className="bg-white shadow-lg text-black">
        <NavbarBrand>
          <AcmeLogo />
          <p
            className="font-bold text-inherit cursor-pointer"
            onClick={() => {}}
          >
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
                    @{firstname} {lastname}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => {
                    navigate("/");
                    deleteCookie("access_token");
                    deleteCookie("refresh_token");
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
