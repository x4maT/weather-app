import { combineReducers } from '@reduxjs/toolkit';
import commonReducer from './common/slice';
import weatherReducer from './weather/slice';

const rootReducer = combineReducers({
  common: commonReducer,
  weather: weatherReducer,
});

export default rootReducer;
