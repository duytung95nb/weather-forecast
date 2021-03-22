import moment from 'moment';
import { AnyAction } from 'redux';
import { Location } from '../Search/Models';
import { defaultWeatherInfoActions, defaultWeatherInfoReducer } from './DefaultWeatherInfoSlice';
import { DefaultWeatherInfoState, ForecastResult } from './Models';

describe('Default weather info reducers', () => {
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

  it('returns the initial state when an action type is not passed', () => {
    const newState = defaultWeatherInfoReducer(undefined, {} as AnyAction);
    expect(newState).toEqual(initialState);
  });
  describe('fetchNearestLocationSuccess', () => {
    it('returns no location', () => {
      const mockLocations = [] as Location[];
      const newState = defaultWeatherInfoReducer(
        initialState,
        defaultWeatherInfoActions.fetchNearestLocationSuccess(mockLocations),
      );
      expect(newState.nearestLocation).toEqual(undefined);
    });
    it('returns the only location', () => {
      const mockLocations = [
        {
          distance: 20,
        },
      ] as Location[];
      const newState = defaultWeatherInfoReducer(
        initialState,
        defaultWeatherInfoActions.fetchNearestLocationSuccess(mockLocations),
      );
      expect(newState.nearestLocation).toEqual(mockLocations[0]);
    });
    it('returns nearest location', () => {
      const mockLocations = [
        {
          distance: 20,
        },
        {
          distance: 10,
        },
        {
          distance: 30,
        },
        {
          distance: 40,
        },
      ] as Location[];
      const newState = defaultWeatherInfoReducer(
        initialState,
        defaultWeatherInfoActions.fetchNearestLocationSuccess(mockLocations),
      );
      expect(newState.nearestLocation).toEqual(mockLocations[1]);
    });

    it('returns nearest later location', () => {
      const mockLocations = [
        {
          distance: 20,
        },
        {
          distance: 10,
        },
        {
          distance: 10,
        },
        {
          distance: 40,
        },
      ] as Location[];
      const newState = defaultWeatherInfoReducer(
        initialState,
        defaultWeatherInfoActions.fetchNearestLocationSuccess(mockLocations),
      );
      expect(newState.nearestLocation).toEqual(mockLocations[2]);
    });
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
      const newState = defaultWeatherInfoReducer(
        initialState,
        defaultWeatherInfoActions.fetchForecastListSuccess(mockForecastResult),
      );
      expect(newState.forecastResult?.consolidated_weather.length).toBe(numberOfForecastDays);
    });
    it('returns the list of next 5 days forecast when there are dates ahead from today', () => {
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
      const newState = defaultWeatherInfoReducer(
        initialState,
        defaultWeatherInfoActions.fetchForecastListSuccess(mockForecastResult),
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
      const newState = defaultWeatherInfoReducer(
        initialState,
        defaultWeatherInfoActions.fetchForecastListSuccess(mockForecastResult),
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
      const newState = defaultWeatherInfoReducer(
        initialState,
        defaultWeatherInfoActions.fetchForecastListSuccess(mockForecastResult),
      );
      expect(newState.forecastResult?.consolidated_weather.length).toBe(0);
    });
  });
});
