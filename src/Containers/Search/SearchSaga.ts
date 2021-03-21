import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import geolocationDataService from '../../DataServices/GeolocationDataService';
import { Location } from './Models';
import { searchActions } from './SearchSlice';

function* fetchLocations(action: PayloadAction<string>) {
  if (!action.payload) {
    yield put(searchActions.resetSearch());
    return;
  }

  const lattLongArray = action.payload.split(',');
  const lattAsFloat = parseFloat(lattLongArray[0]);
  const longAsFloat = parseFloat(lattLongArray[1]);
  const isValidLattLong = !isNaN(lattAsFloat) && !isNaN(longAsFloat);
  if (isValidLattLong) {
    try {
      // Search by lat long if search term is a couple of number
      const locations: Location[] = yield call(
        geolocationDataService.searchByLatLong,
        lattAsFloat,
        longAsFloat,
      );
      yield put(searchActions.fetchLocationsSuccess(locations));
    } catch (e) {
      yield put(searchActions.fetchLocationsByLattLongFailed(e));
    }
    return;
  }
  try {
    // Search by lat long if search term is a couple of number
    const locations: Location[] = yield call(
      geolocationDataService.searchByText,
      action.payload,
    );
    yield put(searchActions.fetchLocationsSuccess(locations));
  } catch (e) {
    yield put(searchActions.fetchLocationsFailed(e));
  }
}

export default function* searchSaga() {
  yield takeLatest(searchActions.fetchLocations, fetchLocations);
}
