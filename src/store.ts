import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { defaultWeatherInfoReducer } from './Containers/DefaultWeatherInfo/DefaultWeatherInfoSlice';
import createSagaMiddleware from 'redux-saga';
import { searchReducer } from './Containers/Search/SearchSlice';
import rootSaga from './RootSaga';
import { locationWeatherInfoReducer } from './Containers/LocationWeatherInfo/LocationWeatherInfoSlice';

const rootReducer = combineReducers({
  defaultWeatherInfo: defaultWeatherInfoReducer,
  locationWeatherInfo: locationWeatherInfoReducer,
  searchBox: searchReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export default store;
