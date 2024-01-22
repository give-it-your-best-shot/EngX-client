import axios from "axios";
import { SERVER_URL } from "./const";

const http = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json;charset=UTF-8",
  },
  timeout: 10000,
});
export default http;

/*
Success response return 'payload'
{
  "payload": {
    "id": 1001,
    "name": "Wing"
  }
}

Error response return 'error'
{
  "error": {
    "code": 404,
    "message": "ID not found"
  }
}

use if ("error" in response) {}
*/
