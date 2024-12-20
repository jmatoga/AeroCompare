import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { postRequest } from "../axios_helper.js";

export default function AdminPanel() {
  const [planeData, setPlaneData] = useState({
    model: "",
    manufacturer: "",
    yearManufactured: "",
    type: "",
    seats: "",
    rangeKm: "",
    maxSpeedKmh: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaneData({ ...planeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest("api/airplane", planeData).then((response) => {
      alert(
        `Samolot: ${planeData.model} - ${planeData.manufacturer} - ${planeData.yearManufactured}r. dodany pomyślnie!`
      );
    });

    // Resetowanie formularza po wysłaniu danych
    setPlaneData({
      model: "",
      manufacturer: "",
      yearManufactured: "",
      type: "",
      seats: "",
      rangeKm: "",
      maxSpeedKmh: "",
    });
  };

  return (
    <Container className="my-5">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "1000px", width: "100%" }}
      >
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Dodaj Nowy Samolot</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formModel" className="mb-3">
                <Form.Label>Model Samolotu</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź model"
                  name="model"
                  value={planeData.model}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formManufacturer" className="mb-3">
                <Form.Label>Producent Samolotu</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź producenta"
                  name="manufacturer"
                  value={planeData.manufacturer}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formYearManufactured" className="mb-3">
                <Form.Label>Rok Produkcji</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Wprowadź rok"
                  name="yearManufactured"
                  value={planeData.yearManufactured}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formType" className="mb-3">
                <Form.Label>Typ Samolotu</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź typ samolotu"
                  name="type"
                  value={planeData.type}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formSeats" className="mb-3">
                <Form.Label>Ilość miejsc</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Wprowadź ilość miejsc"
                  name="seats"
                  value={planeData.seats}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formRangeKm" className="mb-3">
                <Form.Label>Zasięg</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Wprowadź zasięg"
                  name="rangeKm"
                  value={planeData.rangeKm}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMaxSpeedKmh" className="mb-3">
                <Form.Label>Maksymalna prędkość</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Wprowadź maksymalną prędkość"
                  name="maxSpeedKmh"
                  value={planeData.maxSpeedKmh}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Dodaj Samolot
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
