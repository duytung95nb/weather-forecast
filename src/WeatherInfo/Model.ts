import { DefaultLocation } from '../Models/DefaultLocation';

export interface ForecastItem {}
export interface WeatherInfoState {
    defaultLocation: DefaultLocation | null;
    forecastList: ForecastItem | [];
}
