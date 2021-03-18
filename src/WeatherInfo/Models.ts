import { DefaultLocation } from '../Models/DefaultLocation';
import { BaseContainerModel } from '../BaseModels/BaseContainerModel';
export interface ForecastItem {}
export interface WeatherInfoState extends BaseContainerModel {
    defaultLocation: DefaultLocation | null;
    forecastList: ForecastItem | [];
}
