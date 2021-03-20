import { DefaultLocation } from '../../Models/DefaultLocation';
import { BaseContainerState } from '../BaseContainerState';
import { Location } from '../Search/Models';
export interface ForecastItem {
  id: number;
  weather_state_name: string;
  weather_state_abbr: string;
  wind_direction_compass: string;
  created: string;
  applicable_date: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  wind_speed: number;
  wind_direction: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}
export interface ForecastResult {
  consolidated_weather: ForecastItem[];
  time: string;
  sun_rise: string;
  sun_set: string;
  timezone: string;
  timezone_name: string;
  title: string;
  woeid: number;
  // TODO: there' many more, add if necessary
}
export interface DefaultWeatherInfoState extends BaseContainerState {
  locationByIpAddress: DefaultLocation | null;
  nearestLocation: Location | null;
  forecastResult: ForecastResult | null;
}
