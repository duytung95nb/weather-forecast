import './App.css';
import { ReactElement } from 'react';
import DefaultWeatherInfo from './Containers/DefaultWeatherInfo/DefaultWeatherInfo';
import Search from './Containers/Search/Search';
import { Container, Row, Col } from 'react-bootstrap';
import LocationWeatherInfo from './Containers/LocationWeatherInfo/LocationWeatherInfo';
import { ToastProvider } from 'react-toast-notifications';
import FooterPage from './Components/Footer/Footer';

function App(): ReactElement {
  return (
    <ToastProvider>
      <Container>
        <Row>
          <Search />
        </Row>
        <Row>
          <DefaultWeatherInfo />
          <LocationWeatherInfo />
        </Row>
      </Container>
      <Container fluid className="mt-5">
        <Row>
          <FooterPage />
        </Row>
      </Container>
    </ToastProvider>
  );
}

export default App;
