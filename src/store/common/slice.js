import { createSlice } from '@reduxjs/toolkit';
import { ENGLISH } from '../../i18n/locales';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isLoading: false,
    locale: ENGLISH,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setLocale: (state, { payload }) => {
      state.locale = payload;
    },
  },
});

export const { setLoading, setLocale, setError } = commonSlice.actions;

export default commonSlice.reducer;
