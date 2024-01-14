import React, { createContext, useState, useEffect } from "react";
import { User } from "../types/user.type";
import { deleteCookie, getCookie } from "cookies-next";
import EngXAuthService from "../services/engx_auth_service";

// Initiate Context
const AuthContext = createContext({});
// Provide Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const engx_auth_service = EngXAuthService.getInstance();
  useEffect(() => {
    let access_token = getCookie("access_token");
    if (access_token)
      engx_auth_service.getUser().then(user => {
        setUser(user);
      });
  }, []);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
