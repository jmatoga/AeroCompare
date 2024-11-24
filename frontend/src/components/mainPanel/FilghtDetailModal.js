import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { FaPlaneDeparture, FaPlaneArrival, FaTicketAlt } from "react-icons/fa";
import { IoCalendarOutline, IoTimeOutline, IoPerson } from "react-icons/io5";
import { format } from "date-fns";
import InfoIcon from "@mui/icons-material/Info";
import TimerIcon from "@mui/icons-material/Timer";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

export default function FlightDetailsModal({ show, onHide, flightDetails }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Flight Details: {flightDetails.airline.iata_code}{" "}
          {flightDetails.flightNumber}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-center mb-4">Flight Information</h5>

        {/* Flight Route */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <FlightTakeoffIcon className="me-2 text-primary" />
            <strong>From:</strong>
            <br />
            {flightDetails.departureAirport.name} (
            {flightDetails.departureAirport.iata_code}) <br />
            {flightDetails.departureAirport.city},{" "}
            {flightDetails.departureAirport.country}
          </div>
          <div class="text-end">
            <FlightLandIcon className="me-2 text-primary" />
            <strong>To:</strong>
            <br />
            {flightDetails.arrivalAirport.name} (
            {flightDetails.arrivalAirport.iata_code}) <br />
            {flightDetails.arrivalAirport.city},{" "}
            {flightDetails.arrivalAirport.country}
          </div>
        </div>

        {/* Date */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <CalendarMonthIcon className="me-2 text-primary" />
            <strong>Date:</strong>
            <br />
            {format(new Date(flightDetails.departureTime), "EEEE dd.MM.yyyy")}
          </div>
          <div class="text-end">
            <CalendarMonthIcon className="me-2 text-primary" />
            <strong>Date:</strong>
            <br />
            {format(new Date(flightDetails.arrivalTime), "EEEE dd.MM.yyyy")}
          </div>
        </div>

        {/* Time */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <AccessTimeIcon className="me-2 text-primary" />
            <strong>Time:</strong>
            <br />
            {new Date(flightDetails.departureTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div class="text-end">
            <AccessTimeIcon className="me-2 text-primary" />
            <strong>Time:</strong>
            <br />
            {new Date(flightDetails.arrivalTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Duration and Ticket Number */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <TimerIcon className="me-2 text-primary" />
            <strong>Duration:</strong>
            <br />
            {flightDetails.duration}
          </div>
          <div class="text-end">
            <AirplaneTicketIcon className="me-2 text-primary" />
            <strong>Ticket Number:</strong>
            <br />
            {flightDetails.airline.iata_code} {flightDetails.flightNumber}
          </div>
        </div>

        {/* Airplane Details */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <InfoIcon className="me-2 text-primary" />
            <strong>Airplane Info:</strong>
            <br />
            {flightDetails.airplane.type} - {flightDetails.airplane.model}
            <br />
            year: {flightDetails.airplane.yearManufactured}
            <br />
            range: {flightDetails.airplane.rangeKm} km
            <br />
            Max Speed: {flightDetails.airplane.maxSpeedKmh} km/h
          </div>
        </div>

        {/* Passengers Details */}
        <h5 className="text-center mb-3">Passengers Costs</h5>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Passenger</th>
              <th>Price</th>
              <th>Seat</th>
            </tr>
          </thead>
          <tbody>
            {/* {flightDetails.passengers.map((passenger, index) => ( */}
            <tr>
              <td>1</td>
              <td>{"Adult"}</td>
              <td>{flightDetails.priceForAdult} PLN</td>
              {/* <td>{passenger.seat}</td> */}
            </tr>
            <tr>
              <td>2</td>
              <td>{"Child"}</td>
              <td>{flightDetails.priceForChild} PLN</td>
            </tr>
            <tr>
              <td>3</td>
              <td>{"Infant"}</td>
              <td>FREE!</td>
            </tr>
            <tr>
              <td>4</td>
              <td>{"Hand Luggage"}</td>
              <td>{flightDetails.priceForHandLuggage} PLN</td>
            </tr>
            <tr>
              <td>5</td>
              <td>{"Checked Baggage"}</td>
              <td>{flightDetails.priceForCheckedLuggage} PLN</td>
            </tr>
            {/* ))} */}
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

// import React from "react";
// import { Modal } from "react-bootstrap";
// import {
//   // Modal,
//   Box,
//   Typography,
//   Grid,
//   Divider,
//   IconButton,
// } from "@mui/material";
// import {
//   FlightTakeoff,
//   FlightLand,
//   Luggage,
//   AttachMoney,
// } from "@mui/icons-material";

// const FlightDetailsModal = ({ show, onHide, flightDetails }) => {
//   const {
//     flightNumber,
//     departureAirport,
//     arrivalAirport,
//     departureTime,
//     arrivalTime,
//     airline,
//     airplane,
//     priceForAdult,
//     priceForChild,
//     priceForHandLuggage,
//     priceForCheckedLuggage,
//     duration,
//   } = flightDetails;

//   return (
//     // <Modal
//     //   open={open}
//     //   onClose={onClose}
//     //   aria-labelledby="flight-details-modal"
//     //   sx={{
//     //     zIndex: 1300,
//     //   }}
//     // >
//     <Modal show={show} onHide={onHide} size="lg" centered>
//       <Box
//         sx={{
//           width: 400,
//           margin: "auto",
//           bgcolor: "background.paper",
//           padding: 3,
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Flight Details: {flightNumber}
//         </Typography>
//         <Grid container spacing={2}>
//           {/* Departure and Arrival Info */}
//           <Grid item xs={6}>
//             <Typography variant="subtitle1">
//               <FlightTakeoff fontSize="small" /> {departureAirport.name} (
//               {departureAirport.iata_code})
//               <br />
//               {departureAirport.city}, {departureAirport.country}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Departure: {new Date(departureTime).toLocaleString()}
//             </Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <Typography variant="subtitle1">
//               <FlightLand fontSize="small" /> {arrivalAirport.name} (
//               {arrivalAirport.iata_code})
//               <br />
//               {arrivalAirport.city}, {arrivalAirport.country}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Arrival: {new Date(arrivalTime).toLocaleString()}
//             </Typography>
//           </Grid>

//           {/* Airline and Airplane Info */}
//           <Grid item xs={12}>
//             <Typography variant="subtitle1">
//               Airline: {airline !== null ? airline.name : "NULL"} (
//               {airline !== null ? airline.iata_code : "NULL"})
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Airplane: {airplane.model} - {airplane.manufacturer} (
//               {airplane.yearManufactured})
//               <br />
//               Type: {airplane.type}, Seats: {airplane.seats}, Max Speed:{" "}
//               {airplane.maxSpeedKmh} km/h
//             </Typography>
//           </Grid>

//           {/* Duration and Pricing Info */}
//           <Grid item xs={12}>
//             <Divider />
//             <Typography variant="subtitle1" sx={{ mt: 2 }}>
//               Flight Duration: {duration}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Price for Adult: ${priceForAdult}
//               <br />
//               Price for Child: ${priceForChild}
//               <br />
//               Hand Luggage: ${priceForHandLuggage}, Checked Luggage: $
//               {priceForCheckedLuggage}
//             </Typography>
//           </Grid>
//         </Grid>
//         <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
//           <IconButton onClick={onHide} color="primary">
//             Close
//           </IconButton>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default FlightDetailsModal;
