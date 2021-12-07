import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getForecastByGeoLocation,
  getForecastByCityName,
} from '../../api/weather';
import { setCity } from './slice';
import { setLoading, setError } from '../common/slice';
import { GET_BY_GEO_LOCATION, GET_BY_CITY_NAME } from './actionTypes';

export function* fetchForecastByGeoLocation({ payload }) {
  try {
    yield put(setLoading(true));
    const result = yield call(getForecastByGeoLocation, payload);
    yield put(
      setCity({
        ...result.data,
        ...(payload.current && { current: true }),
        lang: payload.lang,
      }),
    );
    yield put(setLoading(false));
  } catch (error) {
    yield put(setError(error));
    yield put(setLoading(false));
  }
}

export function* fetchForecastByCityName({ payload }) {
  try {
    yield put(setLoading(true));
    const result = yield call(getForecastByCityName, payload);
    yield put(
      setCity({
        ...result.data,
        lang: payload.lang,
      }),
    );
    yield put(setLoading(false));
  } catch (error) {
    yield put(setError(error));
    yield put(setLoading(false));
  }
}

export default [
  takeEvery(GET_BY_GEO_LOCATION, fetchForecastByGeoLocation),
  takeEvery(GET_BY_CITY_NAME, fetchForecastByCityName),
];
