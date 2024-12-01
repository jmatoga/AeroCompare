import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
import "../../resources/Bebas-Neue.ttf";

export default function NavBar({ isAdmin }) {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontFamily:
              "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", // Ustawiamy font-family
          }}
        >
          Aero Compare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Search
            </Nav.Link>
            <Nav.Link as={Link} to="/features">
              Favourites
            </Nav.Link>
            <Nav.Link as={Link} to="/pricing">
              History
            </Nav.Link>
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
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
