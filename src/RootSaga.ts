import { all, spawn, takeLatest } from '@redux-saga/core/effects';
import searchSaga from './Containers/Search/SearchSaga';
import defaultWeatherInfoSaga from './Containers/DefaultWeatherInfo/DefaultWeatherInfoSaga';
import locationtWeatherInfoSaga from './Containers/LocationWeatherInfo/LocationWeatherInfoSaga';

export default function* rootSaga() {
  yield spawn(searchSaga);
  yield spawn(defaultWeatherInfoSaga);
  yield spawn(locationtWeatherInfoSaga);
}
