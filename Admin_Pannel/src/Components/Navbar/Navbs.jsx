import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Graph from '../Graph/Location';
import { Button } from 'react-bootstrap';
import { useAuth } from '../Context/Authcontext';

function CollapsibleExample() {
  const { logout } = useAuth();
  const handlelogout = () => {
    logout();
    window.location.reload();
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark" fixed="top" >
      <Container>
        <Navbar.Brand as={Link} to="/home">MealsBridge</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/predict">Predict</Nav.Link>
            <NavDropdown title="Archive" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/archive">Orders</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/archive/users">Users</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/location">Distribute</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">
              <Graph></Graph>
            </Nav.Link>
            <Nav.Link href="#deets">
              <Button variant="outline-light" onClick={handlelogout}>Logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
