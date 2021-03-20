import moment from 'moment';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { ForecastItem } from '../../Containers/DefaultWeatherInfo/Models';
interface Props {
  forecastItems?: ForecastItem[];
  loadingData: boolean;
}
function getDisplayApplicableDate(applicableDate: string) {
  const applicableDateInTimeStamp = moment(applicableDate);
  if (moment().isSame(applicableDateInTimeStamp, 'day')) {
    return 'Today';
  } else if (moment().add(1, 'day').isSame(applicableDateInTimeStamp, 'day')) {
    return 'Tomorrow';
  }

  return moment(applicableDate).format('ddd DD MMM');
}
export default function ForecastList(props: Props) {
  const { forecastItems, loadingData } = props;
  return loadingData ? (
    <Row className="mt-3 justify-content-center">
      <Spinner animation={'border'} />
    </Row>
  ) : (
    <Row>
      {forecastItems &&
        forecastItems.map((item) => {
          return (
            <Col className={'mt-2'} xs={12} lg={2} md={4} key={item.id}>
              <Card>
                <Card.Header>
                  <Card.Title>
                    {getDisplayApplicableDate(item.applicable_date)}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>Min: {Math.round(item.min_temp)}&#8451;</Card.Text>
                  <Card.Text>Max: {Math.round(item.max_temp)}&#8451;</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
}
