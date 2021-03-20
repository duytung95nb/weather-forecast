import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { DefaultLocation } from '../../Models/DefaultLocation';
import { Location } from '../Search/Models';
import { DefaultWeatherInfoState, ForecastResult } from './Models';

const initialState: DefaultWeatherInfoState = {
  locationByIpAddress: null,
  nearestLocation: null,
  forecastResult: null,
  error: {
    fetchLocationByIP: false,
    fetchNearestLocation: false,
    fetchForecastList: false,
  },
  errorMessage: '',
  loadingData: false,
};

const slice = createSlice({
  name: 'defaultWeatherInfo',
  initialState: initialState,
  reducers: {
    fetchLocationByIp: (state) => {
      state.loadingData = true;
    },
    fetchLocationByIPSuccess: (
      state,
      action: PayloadAction<DefaultLocation>,
    ) => {
      state.loadingData = false;
      state.locationByIpAddress = action.payload;
    },
    fetchLocationByIPFailed: (state, action: PayloadAction<AxiosError>) => {
      state.loadingData = false;
    },
    fetchNearestLocation: (state, action: PayloadAction<DefaultLocation>) => {
      state.loadingData = true;
    },
    fetchNearestLocationSuccess: (state, action: PayloadAction<Location[]>) => {
      state.loadingData = false;
      let nearestLocation = action.payload[0];
      action.payload.forEach((loc) => {
        if (loc.distance < nearestLocation.distance) {
          nearestLocation = loc;
        }
      });
      state.nearestLocation = nearestLocation;
    },
    fetchNearestLocationFailed: (state, action: PayloadAction<AxiosError>) => {
      state.loadingData = false;
      state.error.fetchNearestLocation = true;
      state.errorMessage = action.payload.message;
    },
    fetchForecastList: (state, action: PayloadAction<Location>) => {
      state.loadingData = true;
    },
    fetchForecastListSuccess: (
      state,
      action: PayloadAction<ForecastResult>,
    ) => {
      state.loadingData = false;
      state.forecastResult = action.payload;
    },
    fetchForecastListFailed: (state, action: PayloadAction<AxiosError>) => {
      state.loadingData = false;
      state.error.fetchForecastList = true;
      state.errorMessage = action.payload.message;
    },
    resetErrorState: (state) => {
      Object.keys(state.error).forEach((key) => {
        state.error[key] = false;
      });
      state.errorMessage = '';
    },
  },
});
export const {
  reducer: defaultWeatherInfoReducer,
  actions: defaultWeatherInfoActions,
} = slice;
