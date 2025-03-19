import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedState } from "../../types/redux";
import { Feed } from "../../types/interfaces/feed";

/** authState 초기값 */
const initialAuthState: FeedState = {
  feed: []
}
const feedStateSlice = createSlice({
  name: 'feed',
  initialState: initialAuthState,
  reducers: {
    setFeed: (state, action: PayloadAction<Feed[]>) => {
      state.feed = action.payload;
    },
    addFeed: (state, action: PayloadAction<Feed>) => {
      const newFeed = action.payload;
      state.feed = [...state.feed, newFeed];
    }
  }
})



export const feedActions = feedStateSlice.actions;

export default feedStateSlice.reducer;