import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/redux";
import { UserData } from "../../types/interfaces/user";
import { setItem } from "../../utils/storage";

/** authState 초기값 */
const initialAuthState: AuthState = {
  isAuthenticated: !!localStorage.getItem('accessToken'), // 토큰 유무로 초기화
  isPetState: !!localStorage.getItem('isPetState'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
}
const authStateSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action: PayloadAction<{ accessToken: string; isPetState: boolean; user: UserData;}>) {
      state.isAuthenticated = !!action.payload.accessToken;
      state.isPetState = action.payload.isPetState
      state.user = action.payload.user;

      setItem('accessToken', action.payload.accessToken);
      setItem('isPetState', action.payload.isPetState);
      setItem('user', action.payload.user);
    },

    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isPetState');
    },

    setExistPetData(state, action: PayloadAction<boolean>) {
      state.isPetState = action.payload;
      localStorage.setItem('isPetState', JSON.stringify(action.payload))
    }
  }
})



export const authActions = authStateSlice.actions;

export default authStateSlice.reducer;