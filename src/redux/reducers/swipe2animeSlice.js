import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Async thunk to fetch anime data with retry logic
export const fetchSwipe2Anime = createAsyncThunk(
  "swipe2anime/fetchSwipe2Anime",
  async (_, { rejectWithValue }) => {
    const fetchData = async (attempt = 1) => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/seasons/2025/winter");
        return response.data.data;
      } catch (error) {
        if (attempt < 10) {
          // Retry after 2 seconds if we haven't reached the max retry count
          await delay(2000);
          return fetchData(attempt + 1);  // Recursively call fetchData with increased attempt count
        } else {
          // If we reach 10 retries, throw the error
          return rejectWithValue("Failed to fetch data after 10 attempts.");
        }
      }
    };

    return fetchData(); // Start the fetching with the first attempt
  }
);

const swipe2animeSlice = createSlice({
  name: "swipe2anime",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwipe2Anime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSwipe2Anime.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchSwipe2Anime.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default swipe2animeSlice.reducer;
