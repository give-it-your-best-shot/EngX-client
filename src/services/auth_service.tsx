import { getCookie } from "cookies-next";
import { User } from "src/types/user.type";
import http from "src/utils/http";

interface AuthReponse {
  access_token: string;
  refresh_token: string;
  auth_user: User;
}

class AuthService {
  public async login(
    username: string,
    password: string,
  ): Promise<AuthReponse | null> {
    const body = {
      username: username,
      password: password,
    };
    const response = await http.post(`/auth/authenticate`, body);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }

  public async register(
    firstname: string,
    lastname: string,
    username: string,
    password: string,
  ): Promise<AuthReponse | null> {
    const body = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
    };
    const response = await http.post("/auth/register", body);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }

  public async logout(): Promise<boolean> {
    const token = getCookie("access_token");
    const response = await http.post("/auth/logout", null, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return !("error" in data);
  }

  public async getUser(): Promise<User | null | undefined> {
    const access_token = getCookie("access_token");
    if (!Boolean(access_token)) return undefined;
    const response = await http.post("/users/get-user", null, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }

  public async refresh(): Promise<AuthReponse | null> {
    const refresh_token = getCookie("refresh_token");
    const response = await http.post(`/auth/refresh`, null, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${refresh_token}`,
      },
    });
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }
}

export default new AuthService();
