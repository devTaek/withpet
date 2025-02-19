import { UserData } from "../interfaces/user";

export interface AuthState {
  isAuthenticated: boolean,
  isPetState: number,
  user: UserData | null
}

export interface UserState {
  user: UserData;
}
