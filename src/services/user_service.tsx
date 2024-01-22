export default class UserService {
  private static instance: UserService;
  public static getInstance(): UserService {
    if (this.instance == null) this.instance = new UserService();
    return this.instance;
  }

  private constructor() {}
}
