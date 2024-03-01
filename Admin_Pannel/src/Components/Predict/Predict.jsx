import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

function DataTable() {
  const [data, setData] = useState([]);
  const [numDays, setNumDays] = useState(10); // Default value is 10

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://172.23.1.220:5000/?num_days=${numDays}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [numDays]);

  const handleSelectChange = (event) => {
    setNumDays(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Waste Forcasted Data Table</h1>
      <Container fluid>
        <label htmlFor="numDays">Select Number of Days:</label>
        <select id="numDays" value={numDays} onChange={handleSelectChange}>
          {[...Array(30).keys()].map((day) => (
            <option key={day + 1} value={day + 1}>{day + 1}</option>
          ))}
        </select>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Day</th>
            <th>Amount of Waste(per person)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([day, value]) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>
    </div>
  );
}

export default DataTable;
