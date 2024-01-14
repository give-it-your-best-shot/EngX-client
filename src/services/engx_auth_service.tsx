import { error } from "console";
import { getCookie } from "cookies-next";
import { User } from "../types/user.type";

export interface LoginReponse {
  access_token: string;
  refresh_token: string;
}

export default class EngXAuthService {
  private static instance: EngXAuthService;
  public static getInstance(): EngXAuthService {
    if (this.instance == null) this.instance = new EngXAuthService();
    return this.instance;
  }

  private hostURL = import.meta.env.VITE_BACKEND_URL;

  private constructor() {}

  public async login(username: string, password: string) {
    return fetch(`${this.hostURL}/auth/authenticate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  }

  public async register(firstname: string, lastname: string, username: string, password: string) {
    return fetch(`${this.hostURL}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      }),
    });
  }

  public async logout(token = getCookie("access_token")) {
    return fetch(`${this.hostURL}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.text());
  }

  public async getUser(token = getCookie("access_token")): Promise<User | null> {
    return fetch(`${this.hostURL}/users/get-user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .catch(error => {
        console.log(error);
        return null;
      });
  }
}
