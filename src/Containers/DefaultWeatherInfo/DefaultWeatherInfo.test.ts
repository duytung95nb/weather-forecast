import { AnyAction } from 'redux';
import { Location } from '../Search/Models';
import {
  defaultWeatherInfoActions,
  defaultWeatherInfoReducer,
} from './DefaultWeatherInfoSlice';
import { DefaultWeatherInfoState, ForecastResult } from './Models';

describe('Default weather info reducer', () => {
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
  describe('fetchForecastListSuccess', () => {
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
    it('returns the initial state when an action type is not passed', () => {
      const reducer = defaultWeatherInfoReducer(undefined, {} as AnyAction);
      expect(reducer).toEqual(initialState);
    });

    it('returns the initial state when an action type is not passed', () => {
      const reducer = defaultWeatherInfoReducer(undefined, {} as AnyAction);
      expect(reducer).toEqual(initialState);
    });

    it('returns the initial state when an action type is not passed', () => {
      const reducer = defaultWeatherInfoReducer(undefined, {} as AnyAction);
      expect(reducer).toEqual(initialState);
    });
  });
});
