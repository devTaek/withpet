import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Themes =  'theme0' | "theme1" | "theme2";

interface ThemeSliceState {
  mode: Themes
}

const initialState: ThemeSliceState = {
  mode: (sessionStorage.getItem("theme") as Themes) || 'theme0'
}

const themeStateSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Themes>) {
      state.mode = action.payload;
      sessionStorage.setItem('theme', action.payload);
    }
  }
})

export const themeActions = themeStateSlice.actions;

export default themeStateSlice.reducer