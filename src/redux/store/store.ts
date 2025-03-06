import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth"
import userReducer from "../slice/user"
import themeReducer from "../slice/theme"
import feedReducer from "../slice/feed"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    theme: themeReducer,
    feed: feedReducer,
  },
  devTools: {
    trace: true,
    traceLimit: 25,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
