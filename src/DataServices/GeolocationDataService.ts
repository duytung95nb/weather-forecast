import axios from 'axios';
import { DefaultCity } from '../Models/DefaultCity';

class GeolocationDataService {
    async getByIpAddress() {
        return await axios.get<DefaultCity>('http://www.geoplugin.net/json.gp');
    }
}
const geolocationDataService = new GeolocationDataService();
export default geolocationDataService;
