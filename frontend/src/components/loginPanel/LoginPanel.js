import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../resources/1.webp";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../footer/Footer";
import Validation from "./LoginValidation";
import { getRequest } from "../axios_helper.js";
import AlertsComponent from "../utils/AlertsComponent.js";

export default function LoginPanel({ onLogin, isAdmin }) {
  useEffect(() => {
    const servicesSection = document.getElementById("services");
    servicesSection.scrollIntoView({ behavior: "auto" });
  }, []);

  let navigate = useNavigate();
  const [alert, setAlert] = useState({
    visible: false,
    message: "message",
    severity: "success",
  });

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (validationErrors.email === "" && validationErrors.password === "") {
      axios
        .post("http://localhost:8090/api/auth/login", values)
        .then(() => {
          setAlert({
            visible: true,
            message: "Logged corretly",
            severity: "success",
          });
          onLogin(true);
          getRequest("api/currentUserRole").then((response) => {
            if (response.data === "ROLE_ADMIN") {
              isAdmin(true);
            } else {
              isAdmin(false);
            }
          });
          navigate("/");
        })
        .catch((error) => {
          setAlert({
            visible: true,
            message: "Invalid email or password. Please try again.",
            severity: "error",
          });
          if (error.response) {
            console.log("Server responded with an error:", error.response.data);
            if (error.response.status === 400) {
              setAlert({
                visible: true,
                message: "Invalid email or password. Please try again.",
                severity: "error",
              });
              sessionStorage.clear();
            } else {
              setAlert({
                visible: true,
                message: "An error occurred. Please try again later.",
                severity: "error",
              });
            }
          } else if (error.request) {
            console.log("No response received:", error.request);
            setAlert({
              visible: true,
              message:
                "No response received from the server. Please try again later.",
              severity: "error",
            });
          } else {
            console.log("Error setting up the request:", error.message);
            setAlert({
              visible: true,
              message: "Error setting up the request. Please try again later.",
              severity: "error",
            });
          }
          console.log(error);
        });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {alert.visible && (
        <AlertsComponent
          message={alert.message}
          visible={alert.visible}
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}
      <Container
        fluid
        className="text-center text-white d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "83vh", height: "100%", paddingTop: "11rem" }}
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
        <Button variant="primary" size="lg" onClick={() => navigate("/")}>
          Get Started
        </Button>
      </Container>
      <Container className="py-2" id="services">
        <Row className="text-center justify-content-center">
          <Col md={6} className="d-flex justify-content-center">
            <Card
              className="mb-4 shadow-sm"
              style={{
                width: "32.2rem",
                height: "23.4rem",
                transform: "translateY(-8.1rem)",
                background: "linear-gradient(135deg, #0a4d8a, #5ca2d8)",
                color: "white",
              }}
            >
              <Card.Body>
                <form action="" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <h1 className="text-center">Login to your account</h1>
                    <br />
                    <label htmlFor="email">
                      <b>Email</b>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter E-mail"
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {errors.email}
                    </p>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">
                      <b>Password</b>
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    <p
                      style={{
                        color: "red",
                        paddingTop: "5px",
                      }}
                    >
                      {errors.password}
                    </p>
                  </div>
                  <button type="submit" className="btn btn-success w-100 py-2">
                    Log in
                  </button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer className="footer" />
    </div>
  );
}
