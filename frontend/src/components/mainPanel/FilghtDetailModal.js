import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { FaPlaneDeparture, FaPlaneArrival, FaTicketAlt } from "react-icons/fa";
import { IoCalendarOutline, IoTimeOutline, IoPerson } from "react-icons/io5";

export default function FlightDetailsModal({ show, onHide, flightDetails }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Flight Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-center mb-4">Flight Information</h5>

        {/* Flight Route */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <FaPlaneDeparture className="me-2 text-primary" />
            <strong>From:</strong> {flightDetails.departureCity} (
            {flightDetails.departureAirport})
          </div>
          <div>
            <FaPlaneArrival className="me-2 text-primary" />
            <strong>To:</strong> {flightDetails.arrivalCity} (
            {flightDetails.arrivalAirport})
          </div>
        </div>

        {/* Date and Time */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <IoCalendarOutline className="me-2 text-primary" />
            <strong>Date:</strong> {flightDetails.date}
          </div>
          <div>
            <IoTimeOutline className="me-2 text-primary" />
            <strong>Time:</strong> {flightDetails.time}
          </div>
        </div>

        {/* Ticket Details */}
        <div className="mb-4">
          <FaTicketAlt className="me-2 text-primary" />
          <strong>Ticket Number:</strong> {flightDetails.ticketNumber}
        </div>

        {/* Passengers Details */}
        <h5 className="text-center mb-3">Passengers</h5>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Seat</th>
            </tr>
          </thead>
          <tbody>
            {flightDetails.passengers.map((passenger, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{passenger.name}</td>
                <td>{passenger.type}</td>
                <td>{passenger.seat}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
