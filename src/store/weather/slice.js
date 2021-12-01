import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    loading: 'idle',
    cities: [],
    favorites: [],
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setLoading, setError } = weatherSlice.actions;

export default weatherSlice.reducer;
