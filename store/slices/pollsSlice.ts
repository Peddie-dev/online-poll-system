import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface PollOption {
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdAt?: string;
}

interface PollsState {
  list: Poll[];
  current?: Poll | null;
  loading: boolean;
  error?: string | null;
}

const initialState: PollsState = {
  list: [],
  current: null,
  loading: false,
  error: null,
};

// Fetch all polls
export const fetchPolls = createAsyncThunk("polls/fetchList", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/api/polls`);
    return Array.isArray(res.data) ? res.data : res.data.polls ?? [];
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Fetch single poll
export const fetchPoll = createAsyncThunk("polls/fetchOne", async (id: string, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/api/polls/${id}`);
    return res.data as Poll;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Create a poll
export const createPoll = createAsyncThunk(
  "polls/create",
  async (payload: { question: string; options: string[] }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/polls`, payload);
      return res.data as Poll;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Vote on a poll
export const voteOnPoll = createAsyncThunk(
  "polls/vote",
  async (payload: { id: string; optionIndex: number }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/polls/${payload.id}/vote`, {
        optionIndex: payload.optionIndex,
      });
      return { id: payload.id, poll: res.data as Poll };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    updateCurrent(state, action: PayloadAction<Poll>) {
      state.current = action.payload;
      const idx = state.list.findIndex((p) => p.id === action.payload.id);
      if (idx >= 0) state.list[idx] = action.payload;
    },
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolls.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchPolls.fulfilled, (s, a) => {
        s.loading = false;
        s.list = Array.isArray(a.payload) ? a.payload : [];
      })
      .addCase(fetchPolls.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })

      .addCase(fetchPoll.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchPoll.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
      .addCase(fetchPoll.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })

      .addCase(createPoll.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(createPoll.fulfilled, (s, a) => {
        s.loading = false;
        s.list.unshift(a.payload);
      })
      .addCase(createPoll.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })

      .addCase(voteOnPoll.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(voteOnPoll.fulfilled, (s, a) => {
        s.loading = false;
        const updated = a.payload.poll;
        const idx = s.list.findIndex((p) => p.id === a.payload.id);
        if (idx >= 0) s.list[idx] = updated;
        if (s.current?.id === a.payload.id) s.current = updated;
      })
      .addCase(voteOnPoll.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; });
  },
});

export const { updateCurrent, clearCurrent } = pollsSlice.actions;
export default pollsSlice.reducer;
