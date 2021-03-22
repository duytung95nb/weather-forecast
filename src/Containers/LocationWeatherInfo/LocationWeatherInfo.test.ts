import moment from 'moment';
import { AnyAction } from 'redux';
import { ForecastResult } from '../DefaultWeatherInfo/Models';
import { locationWeatherInfoActions, locationWeatherInfoReducer } from './LocationWeatherInfoSlice';
import { LocationWeatherInfoState } from './Models';

describe('Location weather info reducers', () => {
  const initialState: LocationWeatherInfoState = {
    forecastResult: null,
    error: {
      fetchForecast: false,
    },
    errorMessage: '',
    loadingData: false,
  };

  it('returns the initial state when an action type is not passed', () => {
    const newState = locationWeatherInfoReducer(undefined, {} as AnyAction);
    expect(newState).toEqual(initialState);
  });
  describe('fetchForecastListSuccess', () => {
    const numberOfForecastDays = 5;
    const today = moment('Sun Mar 21 2021 07:44:31 GMT+0700 (Indochina Time)');
    it('returns the list of next 5 days forecast', () => {
      const mockForecastResult = {
        consolidated_weather: [
          {
            applicable_date: '2021-03-22',
          },
          {
            applicable_date: '2021-03-23',
          },
          {
            applicable_date: '2021-03-24',
          },
          {
            applicable_date: '2021-03-25',
          },
          {
            applicable_date: '2021-03-26',
          },
        ],
      } as ForecastResult;
      const newState = locationWeatherInfoReducer(
        initialState,
        locationWeatherInfoActions.fetchForecastListSuccess(mockForecastResult),
      );
      expect(newState.forecastResult?.consolidated_weather.length).toBe(numberOfForecastDays);
    });
    it('returns the list of next 5 days forecast when there are days ahead', () => {
      const mockForecastResult = {
        consolidated_weather: [
          {
            applicable_date: '2021-03-22',
          },
          {
            applicable_date: '2021-03-23',
          },
          {
            applicable_date: '2021-03-24',
          },
          {
            applicable_date: '2021-03-25',
          },
          {
            applicable_date: '2021-03-26',
          },
          {
            applicable_date: '2021-03-27',
          },
          {
            applicable_date: '2021-03-28',
          },
        ],
      } as ForecastResult;
      const newState = locationWeatherInfoReducer(
        initialState,
        locationWeatherInfoActions.fetchForecastListSuccess(mockForecastResult),
      );
      expect(newState.forecastResult?.consolidated_weather.length).toBe(numberOfForecastDays);
    });

    it('returns the list of next 3 days forecast', () => {
      const mockForecastResult = {
        consolidated_weather: [
          {
            applicable_date: '2021-03-20',
          },
          {
            applicable_date: '2021-03-21',
          },
          {
            applicable_date: '2021-03-22',
          },
          {
            applicable_date: '2021-03-23',
          },
          {
            applicable_date: '2021-03-24',
          },
        ],
      } as ForecastResult;
      const newState = locationWeatherInfoReducer(
        initialState,
        locationWeatherInfoActions.fetchForecastListSuccess(mockForecastResult),
      );
      expect(newState.forecastResult?.consolidated_weather.length).toBe(3);
    });

    it('returns empty list forecast', () => {
      const mockForecastResult = {
        consolidated_weather: [
          {
            applicable_date: '2021-03-20',
          },
          {
            applicable_date: '2021-03-21',
          },
        ],
      } as ForecastResult;
      const newState = locationWeatherInfoReducer(
        initialState,
        locationWeatherInfoActions.fetchForecastListSuccess(mockForecastResult),
      );
      expect(newState.forecastResult?.consolidated_weather.length).toBe(0);
    });
  });
});
