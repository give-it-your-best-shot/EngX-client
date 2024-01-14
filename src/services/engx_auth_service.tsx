import { error } from "console";
import { getCookie } from "cookies-next";

export interface LoginReponse {
    access_token: string,
    refresh_token: string
}

export interface User {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    userRole: string,
    photoURL: string,
}

export default class EngXAuthService {
    private static instance: EngXAuthService
    public static getInstance(): EngXAuthService {
        if(this.instance == null)
            this.instance = new EngXAuthService()
        return this.instance
    }

    private hostURL = import.meta.env.VITE_BACKEND_URL;

    private constructor() {}

    public async login(username: string, password: string): Promise<LoginReponse> {
        return fetch(`${this.hostURL}/auth/authenticate`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
    }

    public async register(firstname: string, lastname: string, username: string, password: string) {
        return fetch(`${this.hostURL}/auth/register`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
            })
        })
        .then(res => res.json())
    }

    public async getUser(token = getCookie("access_token")): Promise<User | undefined> {
        return fetch(`${this.hostURL}/users/get-user`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .catch(error => {
            console.log(error);
            return undefined
        })
    }
}