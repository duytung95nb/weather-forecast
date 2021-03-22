import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import forecastDataService from '../../DataServices/ForecastDataService';
import geolocationDataService from '../../DataServices/GeolocationDataService';
import { DefaultLocation } from '../../Models/DefaultLocation';
import { Location } from '../Search/Models';
import { defaultWeatherInfoActions } from './DefaultWeatherInfoSlice';
import { ForecastResult } from './Models';

function* fetchLocationByIp() {
  try {
    const geoLocationResult: DefaultLocation = yield call(geolocationDataService.getByIpAddress);
    yield put(defaultWeatherInfoActions.fetchLocationByIPSuccess(geoLocationResult));
  } catch (e) {
    yield put(defaultWeatherInfoActions.fetchLocationByIPFailed(e.message));
  }
}
function* fetchNearestLocation(action: PayloadAction<DefaultLocation>) {
  try {
    const locations: Location[] = yield call(
      geolocationDataService.searchByLatLong,
      +action.payload.geoplugin_latitude,
      +action.payload.geoplugin_longitude,
    );
    yield put(defaultWeatherInfoActions.fetchNearestLocationSuccess(locations));
  } catch (e) {
    yield put(defaultWeatherInfoActions.fetchNearestLocationFailed(e.message));
  }
}
function* fetchForecastList(action: PayloadAction<Location>) {
  try {
    const forecastResult: ForecastResult = yield call(
      forecastDataService.getForecastInfo,
      action.payload.woeid,
    );
    yield put(defaultWeatherInfoActions.fetchForecastListSuccess(forecastResult));
  } catch (e) {
    yield put(defaultWeatherInfoActions.fetchForecastListFailed(e.message));
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export default function* defaultWeatherInfoSaga() {
  yield takeLatest(defaultWeatherInfoActions.fetchLocationByIp, fetchLocationByIp);
  yield takeLatest(defaultWeatherInfoActions.fetchNearestLocation, fetchNearestLocation);
  yield takeLatest(defaultWeatherInfoActions.fetchForecastList, fetchForecastList);
}
