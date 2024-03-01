import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function App() {
  const [wasteVal, setWasteVal] = useState('');
  const [kVal, setKVal] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://172.23.1.220:8000/?waste=${wasteVal}&k=${kVal}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKChange = (e) => {
    setKVal(e.target.value);
  };

  return (
    <Container>
      <h1 className="text-center">Find Your Nearest Needy Location</h1>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Waste Amount:</Form.Label>
          <Form.Control type="text" value={wasteVal} onChange={(e) => setWasteVal(e.target.value)} />
        </Col>
        <Col md={6}>
          <Form.Label>No of Places:</Form.Label>
          <Form.Select value={kVal} onChange={handleKChange}>
            {[...Array(10).keys()].map((num) => (
              <option key={num} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button onClick={fetchData}>Fetch Data</Button>
        </Col>
      </Row>
      {data && (
        <Table striped bordered>
          <thead>
            <tr>
                <th>#</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default App;
