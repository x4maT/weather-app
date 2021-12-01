import { all } from 'redux-saga/effects';
import weather from './weather/saga';

export default function* rootSaga() {
  yield all([...weather]);
}
