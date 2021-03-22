import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import moment from 'moment';
import { ForecastItem, ForecastResult } from '../DefaultWeatherInfo/Models';
import { Location } from '../Search/Models';
import { LocationWeatherInfoState } from './Models';

const initialState: LocationWeatherInfoState = {
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
    fetchForecastListSuccess: (state, action: PayloadAction<ForecastResult>) => {
      state.loadingData = false;
      let daysCount = 0;
      const next5DaysForecast = action.payload.consolidated_weather.reduce(
        (prevVal: ForecastItem[], item) => {
          if (
            moment(item.applicable_date, 'YYYY-MM-DD').isAfter(moment(), 'day') &&
            daysCount < 5
          ) {
            prevVal.push(item);
            daysCount++;
          }
          return prevVal;
        },
        [],
      );
      state.forecastResult = action.payload;
      state.forecastResult.consolidated_weather = next5DaysForecast;
    },
    fetchForecastListFailed: (state, action: PayloadAction<string>) => {
      state.loadingData = false;
      state.error.fetchForecast = true;
      state.errorMessage = action.payload;
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
export const { reducer: locationWeatherInfoReducer, actions: locationWeatherInfoActions } = slice;
