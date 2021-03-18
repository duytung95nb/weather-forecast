import axios from 'axios';
import { DefaultLocation as DefaultLocation } from '../Models/DefaultLocation';

class GeolocationDataService {
    async getByIpAddress() {
        return await axios
            .get<DefaultLocation>('http://www.geoplugin.net/json.gp')
            .then((result) => result.data);
    }
}
const geolocationDataService = new GeolocationDataService();
export default geolocationDataService;
