import logo from './logo.svg';
import './App.css';
import { ReactElement } from 'react';
import DefaultWeatherInfo from './Containers/DefaultWeatherInfo/DefaultWeatherInfo';
import Search from './Containers/Search/Search';
import { Container, Row } from 'react-bootstrap';
import LocationWeatherInfo from './Containers/LocationWeatherInfo/LocationWeatherInfo';
import { ToastProvider } from 'react-toast-notifications';

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
    </ToastProvider>
  );
}

export default App;
