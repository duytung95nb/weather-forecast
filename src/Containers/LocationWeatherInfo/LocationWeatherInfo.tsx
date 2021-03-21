import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import ForecastList from '../../Components/ForecastList/ForecastList';
import Location from '../../Components/Location/Location';
import { RootState } from '../../Models/RootState';
import { SearchState } from '../Search/Models';
import { locationWeatherInfoActions } from './LocationWeatherInfoSlice';
import { LocationWeatherInfoState } from './Models';

export default function LocationWeatherInfo() {
  const { forecastResult, loadingData, error, errorMessage } = useSelector<
    RootState,
    LocationWeatherInfoState
  >((state) => state.locationWeatherInfo);
  const { addToast } = useToasts();
  const { selectedLocationOption } = useSelector<RootState, SearchState>(
    (state) => state.searchBox,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedLocationOption) {
      dispatch(locationWeatherInfoActions.resetForecastResult());
      return;
    }
    dispatch(
      locationWeatherInfoActions.fetchForecastList(selectedLocationOption.data),
    );
  }, [selectedLocationOption]);
  useEffect(() => {
    Object.keys(error).forEach((key) => {
      if (error[key]) {
        addToast(errorMessage, { appearance: 'error' });
      }
    });
    dispatch(locationWeatherInfoActions.resetErrorState());
  }, [error, errorMessage]);
  return (
    <Container hidden={!selectedLocationOption}>
      <Location
        title={selectedLocationOption?.label}
        currentTime={forecastResult?.time}
      ></Location>
      <ForecastList
        forecastItems={forecastResult?.consolidated_weather}
        loadingData={loadingData}
      ></ForecastList>
    </Container>
  );
}
