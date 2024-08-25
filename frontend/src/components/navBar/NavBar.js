import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Aero Compare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Strona Główna
            </Nav.Link>
            <Nav.Link as={Link} to="/features">
              Funkcje
            </Nav.Link>
            <Nav.Link as={Link} to="/pricing">
              Cennik
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/user">
            <i className="bi bi-person-circle"></i>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
