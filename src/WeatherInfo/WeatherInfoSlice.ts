import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultLocation } from '../Models/DefaultLocation';
import { WeatherInfoState } from './Models';

const initialState: WeatherInfoState = {
    defaultLocation: null,
    forecastList: [],
    error: {
        fetchInitialLocation: false,
    },
};

const slice = createSlice({
    name: 'weatherInfo',
    initialState: initialState,
    reducers: {
        fetchInitialLocation: () => {},
        fetchInitialLocationSuccess: (
            state,
            action: PayloadAction<DefaultLocation>,
        ) => {
            state.defaultLocation = action.payload;
        },
        fetchInitialLocationFailed: (state, action) => {
            console.log(action);
        },
    },
});
export const {
    reducer: weatherInfoReducer,
    actions: weatherInfoActions,
} = slice;
