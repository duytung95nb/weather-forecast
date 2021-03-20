import { Card, Col, Row } from 'react-bootstrap';

interface Props {
  title?: string;
  currentTime?: string;
}
export default function Location(props: Props) {
  return (
    <Row>
      <Col className={'mt-3'} xs={12} lg={10}>
        <Card>
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle>
              {props.currentTime && new Date(props.currentTime).toDateString()}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
