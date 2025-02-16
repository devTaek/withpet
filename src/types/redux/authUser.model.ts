import { PetInfo, UserData } from "../interfaces/user";

export interface AuthState {
  isAuthenticated: boolean,
  isPetState: boolean,
  user: UserData | null
}

export interface UserState {
  user: UserData;
}
