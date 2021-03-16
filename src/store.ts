import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { weatherInfoReducer } from './WeatherInfo/WeatherInfoSlice';
import createSagaMiddleware from 'redux-saga';
import { weatherInfoSaga } from './WeatherInfo/WeatherInfoSaga';

const rootReducer = combineReducers({
    home: weatherInfoReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(weatherInfoSaga);
export default store;
