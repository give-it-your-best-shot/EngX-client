import { UserRecord } from "src/types/user_record.type";
import http from "src/utils/http";

export default class UserService {
  private static instance: UserService;
  public static getInstance(): UserService {
    if (this.instance == null) this.instance = new UserService();
    return this.instance;
  }

  private constructor() {}

  public async getUnitsRecordByUserId(
    userId: number
  ): Promise<UserRecord | null> {
    const response = await http.get(`/records/users/${userId}/units`);
    const data = response.data;
    if ("error" in data) return null;
    return data.payload;
  }

  public async getBooksRecordByUserId(
    userId: number
  ): Promise<UserRecord | null> {
    const response = await http.get(`/records/users/${userId}/books`);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }
}
