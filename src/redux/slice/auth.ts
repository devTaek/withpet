import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/redux";
import { setItem } from "../../utils/storage";

/** authState 초기값 */
const initialAuthState: AuthState = {
  isAuthenticated: !!localStorage.getItem('accessToken'), // 토큰 유무로 초기화
}
const authStateSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action: PayloadAction<{ accessToken: string; }>) {
      state.isAuthenticated = !!action.payload.accessToken;

      setItem('accessToken', action.payload.accessToken);
    },

    logout(state) {
      state.isAuthenticated = false;
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
  }
})



export const authActions = authStateSlice.actions;

export default authStateSlice.reducer;