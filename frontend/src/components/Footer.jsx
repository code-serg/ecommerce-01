import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p> GuuVee &copy; {year} </p>
          </Col>
        </Row>
      </Container>
    </Footer>
  )
}

export default Footer