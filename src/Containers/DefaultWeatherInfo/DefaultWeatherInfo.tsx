import { FunctionComponent, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Models/RootState';
import ForecastList from '../../Components/ForecastList/ForecastList';
import Location from '../../Components/Location/Location';
import { DefaultWeatherInfoState } from './Models';
import { defaultWeatherInfoActions } from './DefaultWeatherInfoSlice';
import { SearchState } from '../Search/Models';
import { useToasts } from 'react-toast-notifications';

interface Props {}
const DefaultWeatherInfo: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch();
  const {
    locationByIpAddress,
    nearestLocation,
    forecastResult,
    loadingData,
    error,
    errorMessage,
  } = useSelector<RootState, DefaultWeatherInfoState>((state) => state.defaultWeatherInfo);
  const { addToast } = useToasts();
  const { selectedLocationOption } = useSelector<RootState, SearchState>(
    (state) => state.searchBox,
  );
  useEffect(() => {
    dispatch(defaultWeatherInfoActions.fetchLocationByIp());
  }, [dispatch]);
  useEffect(() => {
    if (!locationByIpAddress) {
      return;
    }
    // Fetch data for default location
    dispatch(defaultWeatherInfoActions.fetchNearestLocation(locationByIpAddress));
  }, [locationByIpAddress]);
  useEffect(() => {
    if (!nearestLocation) {
      return;
    }
    // Fetch data for default location
    dispatch(defaultWeatherInfoActions.fetchForecastList(nearestLocation));
  }, [nearestLocation]);
  useEffect(() => {
    const { fetchLocationByIP, fetchNearestLocation, fetchForecastList } = error;
    if (fetchLocationByIP || fetchNearestLocation || fetchForecastList) {
      addToast(errorMessage, { appearance: 'error' });
    }
    dispatch(defaultWeatherInfoActions.resetErrorState());
  }, [error, errorMessage]);
  return (
    <Container hidden={!!selectedLocationOption}>
      <Location
        title={locationByIpAddress?.geoplugin_city}
        currentTime={forecastResult?.time}
      ></Location>
      <ForecastList
        loadingData={loadingData}
        forecastItems={forecastResult?.consolidated_weather}
      ></ForecastList>
    </Container>
  );
};

export default DefaultWeatherInfo;
