import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from '../../types/redux'
import { UserData } from "../../types/interfaces/user";
import { setItem } from "../../utils/storage";
/** userSlice 초기값 */
const initialUser: UserState = {
  user: JSON.parse(localStorage.getItem('user') || 'null')
}


const userStateSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    updateUser(state, action: PayloadAction<{user: UserData}>) {
      state.user = { ...state.user, ...action.payload.user}
      setItem('user', state.user);
    },
  }
})

export const userActions = userStateSlice.actions;

export default userStateSlice.reducer;