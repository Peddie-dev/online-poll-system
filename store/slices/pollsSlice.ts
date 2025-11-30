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

const initialState: PollsState = { list: [], current: null, loading: false, error: null };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ""; // e.g. "https://api.example.com"

// fetch polls list
export const fetchPolls = createAsyncThunk("polls/fetchList", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_BASE}/api/polls`);
    return res.data as Poll[];
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// fetch single poll details
export const fetchPoll = createAsyncThunk("polls/fetchOne", async (id: string, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_BASE}/api/polls/${id}`);
    return res.data as Poll;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// create poll
export const createPoll = createAsyncThunk(
  "polls/create",
  async (payload: { question: string; options: string[] }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/polls`, payload);
      return res.data as Poll;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// vote
export const voteOnPoll = createAsyncThunk(
  "polls/vote",
  async (payload: { id: string; optionIndex: number }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/polls/${payload.id}/vote`, {
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
    // optionally update current poll manually (e.g. via socket)
    updateCurrent(state, action: PayloadAction<Poll>) {
      state.current = action.payload;
      // also update the list if needed
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
      .addCase(fetchPolls.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
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
        // replace poll in list + current
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
