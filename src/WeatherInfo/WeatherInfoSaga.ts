import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import geolocationDataService from '../DataServices/GeolocationDataService';
import { DefaultLocation } from '../Models/DefaultLocation';
import { weatherInfoActions } from './WeatherInfoSlice';

function* fetchInitialLocation() {
    try {
        const geoLocationResult: DefaultLocation = yield call(
            geolocationDataService.getByIpAddress,
        );
        yield put(
            weatherInfoActions.fetchInitialLocationSuccess(geoLocationResult),
        );
    } catch (e) {
        yield put(weatherInfoActions.fetchInitialLocationFailed(e));
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export function* weatherInfoSaga() {
    yield takeEvery(
        weatherInfoActions.fetchInitialLocation,
        fetchInitialLocation,
    );
}
