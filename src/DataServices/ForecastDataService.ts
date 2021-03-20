import APP_CONSTANT from '../Constants/AppConstant';
import AxiosAdapter from './AxiosAdapter';

class ForecastDataService {
  getForecastInfo(whereOnEarthId: number) {
    return AxiosAdapter.get(
      `${APP_CONSTANT.META_WEATHER_API}/location/${whereOnEarthId}`,
    );
  }
}
const forecastDataService = new ForecastDataService();
export default forecastDataService;
