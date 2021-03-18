import { FunctionComponent, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Models/RootState';
import ForecastList from './ForecastList/ForecastList';
import Location from './Location/Location';
import { WeatherInfoState } from './Model';
import { weatherInfoActions } from './WeatherInfoSlice';

interface Props {}
const WeatherInfo: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    const weatherInfo = useSelector<RootState, WeatherInfoState>(
        (state) => state.weatherInfo,
    );
    useEffect(() => {
        console.log('weatherInfo', weatherInfo);
    }, [weatherInfo]);
    useEffect(() => {
        dispatch(weatherInfoActions.fetchInitialLocation());
    }, [dispatch]);
    return (
        <Container>
            <Row>
                <Location
                    city={weatherInfo.defaultLocation?.geoplugin_city}
                ></Location>
            </Row>
            <Row>
                <ForecastList></ForecastList>
            </Row>
        </Container>
    );
};

export default WeatherInfo;
