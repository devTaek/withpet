import { Feed } from "../interfaces/feed";
import { UserData } from "../interfaces/user";

export interface AuthState {
  isAuthenticated: boolean,
}

export interface UserState {
  user: UserData;
}

export interface FeedState {
  feed: Feed;
}