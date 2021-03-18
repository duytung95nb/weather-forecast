import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './Models';

const initialState: SearchState = {
    searchText: '',
    locations: [],
    error: {
        fetchLocationFailed: false,
    },
};

const slice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        fetchLocations: (state, action: PayloadAction<string>) => {},
        fetchLocationsSuccess: (state, action: PayloadAction<Location[]>) => {
            state.locations = action.payload;
        },
        fetchLocationsFailed: (state, action) => {
            console.log(action);
        },
    },
});
export const { reducer: searchReducer, actions: searchActions } = slice;
