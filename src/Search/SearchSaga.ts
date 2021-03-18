import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import geolocationDataService from '../DataServices/GeolocationDataService';
import { searchActions } from './SearchSlice';

function* fetchLocations(action: PayloadAction<string>) {
    try {
        // Search by lat long if search term is a couple of number
        const geoLocationResult: Location[] = yield call(
            geolocationDataService.searchByText,
            action.payload,
        );
        yield put(searchActions.fetchLocationsSuccess(geoLocationResult));
    } catch (e) {
        yield put(searchActions.fetchLocationsSuccess(e));
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export function* weatherInfoSaga() {
    yield takeLatest(searchActions.fetchLocations, fetchLocations);
}
