import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Validation from "./RegisterValidation";
import axios from "axios";
import backgroundImage from "../../resources/1.webp";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../footer/Footer";
import { getRequest } from "../axios_helper.js";
import AlertsComponent from "../utils/AlertsComponent.js";

export default function RegisterPanel() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (
      validationErrors.email === "" &&
      validationErrors.password === "" &&
      validationErrors.confirmPassword === ""
    ) {
      axios
        .post("http://localhost:8090/api/auth/register", values)
        .then((response) => {
          //Cookies.set("accessToken", response.data.token);
          //onRegister(true);
          navigate("/login");
        })
        .catch((error) => {
          if (error.response) {
            console.log("Server responded with an error:", error.response.data);
            if (error.response.status === 400) {
              alert("Invalid data. Please try again.");
              sessionStorage.clear();
            } else {
              alert("An error occurred. Please try again later.");
            }
          } else if (error.request) {
            console.log("No response received:", error.request);
            alert(
              "No response received from the server. Please try again later."
            );
          } else {
            console.log("Error setting up the request:", error.message);
            alert("Error setting up the request. Please try again later.");
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
      {alert && <AlertsComponent />}
      <Container
        fluid
        className="text-center text-white d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "75vh", height: "100%", paddingTop: "11rem" }}
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
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#00D1CD", // Tło
            color: "#fff", // Kolor tekstu
            fontWeight: "bold", // Pogrubienie tekstu
            border: "2px solid #00D1CD",
            boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`, // Efekt cienia
            borderRadius: "7px", // Zaokrąglenie przycisku
            transition: "all 0.3s ease", // Płynna zmiana dla efektów hover
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow = `0 6px 12px rgba(0, 0, 0, 0.3)`)
          } // Cień przy najechaniu
          onMouseOut={(e) =>
            (e.currentTarget.style.boxShadow = `0 4px 8px rgba(0, 0, 0, 0.2)`)
          } // Przywrócenie cienia
        >
          Start Aero Comparing
        </Button>
      </Container>
      <Container className="py-2" id="services">
        <Row className="text-center justify-content-center">
          <Col md={6} className="d-flex justify-content-center">
            <Card
              className="mb-4 shadow-sm mt-2"
              style={{
                width: "32.2rem",
                height: "25.4rem",
                transform: "translateY(-8.1rem)",
                // background: "linear-gradient(135deg, #0a4d8a, #5ca2d8)",
                background: "linear-gradient(135deg, #00AFAE, #00D1CD)",
                color: "white",
              }}
            >
              <Card.Body>
                <form action="" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <h1 className="text-center">Register your account</h1>
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
                  <div className="mb-3">
                    <label htmlFor="password">
                      <b>Confirm Password</b>
                    </label>
                    <input
                      name="confirmPassword"
                      type="confirmPassword"
                      placeholder="Confirm Password"
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
                    Register
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
