import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to retry requests
const retryRequest = async (fn, retries = 10, delay = 2000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

// Async thunk to fetch anime data
export const fetchSwipe1Anime = createAsyncThunk(
  'swipe1anime/fetchSwipe1Anime',
  async (_, { rejectWithValue }) => {
    try {
      const fetchData = () => axios.get(
        'https://api.jikan.moe/v4/anime?order_by=popularity&start_date=2024-01-01&status=complete'
      );

      const response = await retryRequest(fetchData);

      // Filter unique anime with episodes not null
      const uniqueAnime = [];
      const seenTitles = new Set();
      response.data.data.forEach((anime) => {
        if (!seenTitles.has(anime.title) && anime.episodes !== null) {
          seenTitles.add(anime.title);
          uniqueAnime.push(anime);
        }
      });

      return uniqueAnime.slice(0, 10); // Return top 10 unique anime
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const swipe1animeSlice = createSlice({
  name: 'swipe1anime',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwipe1Anime.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSwipe1Anime.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSwipe1Anime.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default swipe1animeSlice.reducer;
