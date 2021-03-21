import { AnyAction } from 'redux';
import { Location, SearchState } from './Models';
import { searchActions, searchReducer } from './SearchSlice';

const searchInitialState: SearchState = {
  errorMessage: '',
  loadingData: false,
  locationLattLongToDataMap: {},
  selectedLocationOption: null,
  error: {
    fetchLocationsFailed: false,
  },
};
describe('Search reducers', () => {
  it('returns the initial state when an action type is not passed', () => {
    const newState = searchReducer(undefined, {} as AnyAction);
    expect(newState).toEqual(searchInitialState);
  });
  describe('fetchLocationsSuccess', () => {
    const fetchedLocations = [
      {
        latt_long: '1.2,3.1',
      },
      {
        latt_long: '1.2,3.2',
      },
    ] as Location[];
    it('return fetched locations', () => {
      const newState = searchReducer(
        searchInitialState,
        searchActions.fetchLocationsSuccess(fetchedLocations),
      );
      expect(newState.locationOptions?.length).toEqual(fetchedLocations.length);
    });
    it('add fetched locations to current list', () => {
      const currentState = {
        ...searchInitialState,
        locationLattLongToDataMap: {
          '1.2,3.3': { latt_long: '1.2,3.3' } as Location,
          '1.2,3.4': { latt_long: '1.2,3.4' } as Location,
        },
      } as SearchState;
      const newState = searchReducer(
        currentState,
        searchActions.fetchLocationsSuccess(fetchedLocations),
      );
      expect(newState.locationOptions?.length).toEqual(
        fetchedLocations.length +
          Object.keys(currentState.locationLattLongToDataMap).length,
      );
    });

    it('add fetched locations to current list, without duplicated latt long', () => {
      const currentState = {
        ...searchInitialState,
        locationLattLongToDataMap: {
          // This is duplicated
          '1.2,3.1': { latt_long: '1.2,3.1' } as Location,
          '1.2,3.4': { latt_long: '1.2,3.4' } as Location,
        },
      } as SearchState;
      const newState = searchReducer(
        currentState,
        searchActions.fetchLocationsSuccess(fetchedLocations),
      );
      const numberOfDuplicated = 1;
      expect(newState.locationOptions?.length).toEqual(
        fetchedLocations.length +
          Object.keys(currentState.locationLattLongToDataMap).length -
          numberOfDuplicated,
      );
    });
  });
});
