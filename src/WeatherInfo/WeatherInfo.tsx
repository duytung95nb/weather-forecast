import { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { weatherInfoActions } from './WeatherInfoSlice';

interface Props {}
const WeatherInfo: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(weatherInfoActions.fetchInitialLocation());
    }, [dispatch]);
    return <div>Weather info</div>;
};

export default WeatherInfo;
