import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { DefaultLocation } from '../../Models/DefaultLocation';
import { ForecastResult } from '../DefaultWeatherInfo/Models';
import { Location } from '../Search/Models';
import { LocationWeatherInfoState } from './Models';

const initialState: LocationWeatherInfoState = {
  selectedLocation: null,
  forecastResult: null,
  error: {
    fetchForecast: false,
  },
  errorMessage: '',
  loadingData: false,
};

const slice = createSlice({
  name: 'locationWeatherInfo',
  initialState: initialState,
  reducers: {
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
      state.error.fetchForecast = true;
      state.errorMessage = action.payload.message;
    },
    resetForecastResult: (state) => {
      state.forecastResult = null;
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
  reducer: locationWeatherInfoReducer,
  actions: locationWeatherInfoActions,
} = slice;
