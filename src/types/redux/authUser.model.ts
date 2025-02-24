import { UserData } from "../interfaces/user";

export interface AuthState {
  isAuthenticated: boolean,
  isPetState: number,
}

export interface UserState {
  user: UserData;
}
