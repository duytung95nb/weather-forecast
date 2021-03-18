import logo from './logo.svg';
import './App.css';
import { ReactElement } from 'react';
import WeatherInfo from './WeatherInfo/WeatherInfo';
import Search from './Search/Search';
import { Container } from 'react-bootstrap';

function App(): ReactElement {
    return (
        <Container>
            <Search />
            <WeatherInfo />
        </Container>
    );
}

export default App;
