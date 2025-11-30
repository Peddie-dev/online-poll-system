import { createSlice } from "@reduxjs/toolkit";

const pollsSlice = createSlice({
  name: "polls",
  initialState: {
    polls: [],
    loading: false,
  },
  reducers: {
    setPolls(state, action) {
      state.polls = action.payload;
    },
  },
});

export const { setPolls } = pollsSlice.actions;
export default pollsSlice.reducer;
