import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../Context/Authcontext';

const OrderDetails = () => {
    const { token } = useAuth();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/order/archieve/'+token)
      .then(response => response.json())
      .then(data => setOrderDetails(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCompleteOrder = (orderId, oid) => {
    fetch(`http://localhost:3000/api/order/isCompleted/${oid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isCompleted: true })
    })
    .then(response => response.json())
    .then(data => {
      // Update the orderDetails state to reflect the change
      setOrderDetails(prevState => prevState.map(order => {
        if (order._id === orderId) {
          return { ...order, isCompleted: true };
        } else {
          return order;
        }
      }));
    })
    .catch(error => console.error('Error completing order:', error));
  };

  return (
    <Table striped bordered hover variant="info" >
      <thead>
        <tr>
          <th>#</th>
          <th>OID</th>
          <th>Food Name</th>
          <th>Quantity</th>
          <th>Location</th>
          <th>Total</th>
          <th>Status</th>
          <th>Distribution</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {orderDetails.map((order, index) => (
          <tr key={order._id}>
            <td>{index + 1}</td>
            <td>{order.oid}</td>
            
            <td>
              {order.foodname.map((food, index) => (
                <div key={index}>{food}</div>
              ))}
            </td>
            <td>
              {order.quantity.map((qty, index) => (
                <div key={index}>{qty}</div>
              ))}
            </td>
            <td>{order.location}</td>
            <td>{order.total}</td>
            <td>{order.status ? 'Accepted' : 'Pending'}</td>
            <td>
              {order.isCompleted ? (
                <span>Completed</span>
              ) : (
                <Button variant="danger" onClick={() => handleCompleteOrder(order._id, order.oid)}>Mark as Completed</Button>
              )}
            </td>
            <td>{new Date(order.date).toLocaleDateString()}</td>
            <td>{order.time}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderDetails;
