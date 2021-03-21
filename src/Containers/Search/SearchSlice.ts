import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Option } from 'react-select/src/filters';
import { Location, SearchState } from './Models';

const initialState: SearchState = {
  locationLattLongToDataMap: {},
  locationOptions: undefined,
  selectedLocationOption: null,
  error: {
    fetchLocationsFailed: false,
  },
  errorMessage: '',
  loadingData: false,
};

const slice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    fetchLocations: (state, action: PayloadAction<string>) => {
      state.loadingData = true;
    },
    fetchLocationsSuccess: (state, action: PayloadAction<Location[]>) => {
      state.loadingData = false;
      action.payload.forEach((location) => {
        state.locationLattLongToDataMap[location.latt_long] = location;
      });
      state.locationOptions = Object.values(
        state.locationLattLongToDataMap,
      ).map((l) => {
        return {
          label: l.title,
          value: l.latt_long,
          data: l,
        } as Option;
      });
    },
    fetchLocationsFailed: (state, action: PayloadAction<AxiosError>) => {
      state.loadingData = false;
      state.error.fetchLocationsFailed = true;
      state.errorMessage = action.payload.message;
    },
    fetchLocationsByLattLongFailed: (
      state,
      action: PayloadAction<AxiosError>,
    ) => {
      state.loadingData = false;
      state.error.fetchLocationsFailed = true;
      state.errorMessage = action.payload.message;
    },
    selectLocationOption: (state, action: PayloadAction<Option | null>) => {
      state.selectedLocationOption = action.payload;
    },
    resetSearch: (state) => {
      state.loadingData = false;
      state.locationOptions = undefined;
    },
    resetErrorState: (state) => {
      Object.keys(state.error).forEach((key) => {
        state.error[key] = false;
      });
      state.errorMessage = '';
    },
  },
});
export const { reducer: searchReducer, actions: searchActions } = slice;
