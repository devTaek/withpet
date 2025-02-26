import { UserData } from "../interfaces/user";

export interface AuthState {
  isAuthenticated: boolean,
}

export interface UserState {
  user: UserData;
}
