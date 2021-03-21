import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import forecastDataService from '../../DataServices/ForecastDataService';
import { ForecastResult } from '../DefaultWeatherInfo/Models';
import { Location } from '../Search/Models';
import { locationWeatherInfoActions } from './LocationWeatherInfoSlice';

function* fetchForecastList(action: PayloadAction<Location>) {
  try {
    const forecastResult: ForecastResult = yield call(
      forecastDataService.getForecastInfo,
      action.payload.woeid,
    );
    yield put(
      locationWeatherInfoActions.fetchForecastListSuccess(forecastResult),
    );
  } catch (e) {
    yield put(locationWeatherInfoActions.fetchForecastListFailed(e.message));
  }
}

export default function* locationtWeatherInfoSaga() {
  yield takeLatest(
    locationWeatherInfoActions.fetchForecastList,
    fetchForecastList,
  );
}
