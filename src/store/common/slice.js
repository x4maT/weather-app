import { createSlice } from '@reduxjs/toolkit';
import { UKRAINE } from '../../i18n/locales';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isLoading: false,
    locale: UKRAINE,
    error: null,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setLocale: (state, { payload }) => {
      state.locale = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    removeError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setLocale, setError, removeError } =
  commonSlice.actions;

export default commonSlice.reducer;
