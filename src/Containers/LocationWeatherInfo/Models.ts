import { BaseContainerState } from '../BaseContainerState';
import { ForecastResult } from '../DefaultWeatherInfo/Models';
import { Location } from '../Search/Models';

export interface LocationWeatherInfoState extends BaseContainerState {
  forecastResult: ForecastResult | null;
}
