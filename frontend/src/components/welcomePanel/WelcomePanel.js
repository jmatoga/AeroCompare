import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Jumbotron,
  Navbar,
  Nav,
} from "react-bootstrap";
import Footer from "../footer/Footer";
import backgroundImage from "../../resources/1.webp";
import { Link, useNavigate } from "react-router-dom";

export default function WelcomePanel() {
  let navigate = useNavigate();
  const [isScaled, setIsScaled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setIsScaled(false);

    const handleScroll = () => {
      const servicesSection = document.getElementById("services");
      const servicesOffsetTop = servicesSection.offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;

      // Sprawdza, czy jesteśmy na pozycji sekcji services
      if (scrollPosition - 1 > servicesOffsetTop) {
        setIsScaled(true);
      } else {
        setIsScaled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        fluid
        className="text-center text-white d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "100vh", height: "100%" }}
      >
        <h1
          className="display-4 mb-3"
          style={{
            fontWeight: "bold",
            textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
          }}
        >
          Welcome to Your Next Adventure
        </h1>
        <p
          className="lead mb-4"
          style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
        >
          Discover breathtaking destinations, plan unforgettable journeys, and
          let us guide you every step of the way.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            const servicesSection = document.getElementById("services");
            servicesSection.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Get Started
        </Button>
      </Container>

      <Container className="py-1" id="services">
        <Row className="text-center">
          <Col md={4}>
            <Card
              className="mb-4 shadow-sm"
              style={{
                width: "18rem",
                height: "13rem",
                transform: isScaled
                  ? "scale(1.8) translateY(-120px)"
                  : "scale(1) translateY(0)",
                transition: "transform 0.3s ease",
                backgroundColor: "rgba(10, 77, 138, 0.8)",
                color: "white",
              }}
            >
              <Card.Body>
                <Card.Title>Flight Booking</Card.Title>
                <Card.Text>
                  We provide seamless flight booking with a wide range of
                  airlines and exclusive deals to fit your needs.
                </Card.Text>
                <Button variant="light">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="mb-4 shadow-sm"
              style={{
                width: "18rem",
                height: "13rem",
                marginLeft: "5rem",
                marginRight: "5rem",
                transform: isScaled
                  ? "scale(1.8) translateY(-120px)"
                  : "scale(1) translateY(0)",
                transition: "transform 0.3s ease",
                background: "linear-gradient(135deg, #0a4d8a, #5ca2d8)",
                color: "white",
              }}
            >
              <Card.Body>
                <Card.Title>Log in</Card.Title>
                <Card.Text>
                  Unlock exclusive benefits with a personalized account and save
                  your favorite destinations.
                </Card.Text>
                <Button variant="light" onClick={() => navigate("/login")}>
                  Log in
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="mb-4 shadow-sm"
              style={{
                width: "18rem",
                height: "13rem",
                marginLeft: "10rem",
                transform: isScaled
                  ? "scale(1.8) translateY(-120px)"
                  : "scale(1) translateY(0)",
                transition: "transform 0.3s ease",
                background: "linear-gradient(135deg, #0066cc, #66b3ff)",
                color: "white",
              }}
            >
              <Card.Body>
                <Card.Title>Travel Guides</Card.Title>
                <Card.Text>
                  Get insider tips and travel advice for the best experiences at
                  any destination around the globe.
                </Card.Text>
                <Button variant="light">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer className="footer" />
    </div>
  );
}
