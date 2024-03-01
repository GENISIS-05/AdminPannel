import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import "./Active.css";

const OrderCards = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    axios.get(`http://localhost:3000/api/order/Orderloc/${token}`)
      .then(response => {
        setOrders(response.data);
        setSpinner(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setSpinner(false);
      });
  }, []);

  const copyTotalQuantity = (totalQuantity) => {
    navigator.clipboard.writeText(totalQuantity.toString());
  };

  return (
    <Container fluid className=' mt-5'>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Active Orders near your location</h1>
      {spinner ? (
        <Spinner animation="border" role="status" style={{ position: "absolute", top: "50%", left: "50%" }} />
      ) : (
        <Row>
          {orders.length > 0 ? orders.map((order) => (
            <Col md={4} sm={6} xs={12} key={order._id} className='mb-3'>
              <Card className="custom-card">
                <Card.Body>
                  <Card.Title className="card-title">Order ID: {order.oid}</Card.Title>
                  <Card.Text>
                    <p className="card-text"><strong>Time:</strong> {order.time}</p>
                    <p className="card-text"><strong>Location:</strong> {order.location}</p>
                    <p className="card-text"><strong>Food Items:</strong></p>
                    <ul className="food-list">
                      {order.foodname.map((food, index) => (
                        <li key={index}>
                          {food} - Quantity: {order.quantity[index]}
                        </li>
                      ))}
                    </ul>
                    <p className="card-text">
                      <strong>Total quantity:</strong> {order.total} person(s)
                      
                      <Button className='mx-3' variant="outline-primary" size="md" onClick={() => copyTotalQuantity(order.total)}>
                        Copy
                      </Button>
                    </p>
                    <p className="card-text"><strong>Status:</strong> {order.status ? "Completed" : "Pending"}</p>
                    <p className="card-text"><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                  </Card.Text>
                  <div className="button-container">
                    <Link to={`/details/${order.oid}`} className="custom-link">
                      <Button variant="primary">View Details</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )) : (
            <h3 style={{ textAlign: "center", width: "100%" }}>No Active Orders</h3>
          )}
        </Row>
      )}
    </Container>
  );
};

export default OrderCards;
