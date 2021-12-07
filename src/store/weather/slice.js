import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    error: null,
    currentLocationId: null,
    isCelsius: true,
    cities: [],
    favorites: [],
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setCity: (state, { payload }) => {
      if (payload.current) {
        state.currentLocationId = payload.sys.id;
      }

      const index = state.cities.findIndex(
        (city) => city.sys.id === payload.sys.id,
      );

      if (~index) {
        state.cities[index] = payload;
        if (state.currentLocationId === payload.sys.id) {
          state.cities[index].current = true;
        }
      } else {
        state.cities.push(payload);
      }

      state.cities = [...state.cities];
    },
    deleteCityById: (state, { payload }) => {
      state.cities = state.cities.filter((city) => city.sys.id !== payload.id);
    },
    switchMeasurementUnitType: (state) => {
      state.isCelsius = !state.isCelsius;
    },
  },
});

export const {
  setLoading,
  setCity,
  switchMeasurementUnitType,
  deleteCityById,
} = weatherSlice.actions;

export default weatherSlice.reducer;
