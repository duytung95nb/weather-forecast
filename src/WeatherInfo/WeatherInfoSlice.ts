import { createSlice } from '@reduxjs/toolkit';
import { WeatherInfoState } from './Model';

const initialState: WeatherInfoState = {
    page: 0,
    users: [],
    currentUserIndex: 0,
    userIdToDetailMap: {},
};

const slice = createSlice({
    name: 'weatherInfo',
    initialState: initialState,
    reducers: {
        fetchInitialLocation: () => {},
        fetchInitialLocationSuccess: (state, action) => {
            console.log(action);
        },
        fetchInitialLocationFailed: (state, action) => {
            console.log(action);
        },
    },
});
export const { reducer: weatherInfoReducer, actions: weatherInfoActions } = slice;
