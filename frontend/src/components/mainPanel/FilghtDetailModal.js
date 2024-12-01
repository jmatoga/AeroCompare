import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaTicketAlt,
  FaBaby,
  FaLuggageCart,
} from "react-icons/fa";
import { IoCalendarOutline, IoTimeOutline, IoPerson } from "react-icons/io5";
import { format } from "date-fns";
import InfoIcon from "@mui/icons-material/Info";
import TimerIcon from "@mui/icons-material/Timer";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { TbMoodKidFilled } from "react-icons/tb";
import { MdLuggage } from "react-icons/md";
import "./FlightDetailModal.css";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function FlightDetailsModal({ show, onHide, flightDetails }) {
  const renderFlightRoute = (flightDetails, className) => {
    return (
      <div className={className}>
        <div className="col mt-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <FlightTakeoffIcon
                className="me-2"
                style={{
                  color: "#00D1CD",
                }}
              />
              <strong>From:</strong>
              <br />
              {flightDetails.departureAirport.name} (
              {flightDetails.departureAirport.iata_code}) <br />
              {flightDetails.departureAirport.city},{" "}
              {flightDetails.departureAirport.country}
            </div>
            <div className="text-end">
              <FlightLandIcon
                className="me-2"
                style={{
                  color: "#00D1CD",
                }}
              />
              <strong>To:</strong>
              <br />
              {flightDetails.arrivalAirport.name} (
              {flightDetails.arrivalAirport.iata_code}) <br />
              {flightDetails.arrivalAirport.city},{" "}
              {flightDetails.arrivalAirport.country}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDate = (flightDetails, className) => {
    return (
      <div className={className}>
        <div className="col mt-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <CalendarMonthIcon
                className="me-2"
                style={{
                  color: "#00D1CD",
                }}
              />
              <strong>Date:</strong>
              <br />
              {format(new Date(flightDetails.departureTime), "EEEE dd.MM.yyyy")}
            </div>
            <div className="text-end">
              <CalendarMonthIcon
                className="me-2"
                style={{
                  color: "#00D1CD",
                }}
              />
              <strong>Date:</strong>
              <br />
              {format(new Date(flightDetails.arrivalTime), "EEEE dd.MM.yyyy")}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTime = (flightDetails, className) => {
    return (
      <div className={className}>
        <div className="col mt-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <AccessTimeIcon
                className="me-2"
                style={{
                  color: "#00D1CD",
                }}
              />
              <strong>Time:</strong>
              <br />
              {new Date(flightDetails.departureTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-end">
              <AccessTimeIcon
                className="me-2"
                style={{
                  color: "#00D1CD",
                }}
              />
              <strong>Time:</strong>
              <br />
              {new Date(flightDetails.arrivalTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDuration = (flightDetails, className, isRelationalFlight) => {
    return (
      <div className={className}>
        <div className="col mt-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <TimerIcon
                className="me-2"
                style={{
                  color: "#00D1CD",
                }}
              />
              <strong>Duration:</strong>
              <br />
              {handleDuration(isRelationalFlight)}
            </div>
            <div className="text-end">
              <AirplaneTicketIcon
                className="me-2"
                style={{
                  color: "#00D1CD",
                }}
              />
              <strong>Ticket Number:</strong>
              <br />
              {flightDetails.airline.iata_code} {flightDetails.flightNumber}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleDuration = (isRelationalFlight) => {
    if (!isRelationalFlight) {
      const departureTime = new Date(flightDetails.departureTime);
      const arrivalTime = new Date(flightDetails.arrivalTime);
      const durationInMs = Math.abs(arrivalTime - departureTime);
      const durationInMinutes = Math.floor(durationInMs / (1000 * 60)); // Łączna liczba minut
      const hours = Math.floor(durationInMinutes / 60); // Całkowita liczba godzin
      const minutes = durationInMinutes % 60; // Reszta minut

      return `${hours}h ${minutes}m`;
    } else {
      const departureTime = new Date(
        flightDetails.relationalFlights[
          flightDetails.relationalFlights.length - 1
        ].departureTime
      );
      const arrivalTime = new Date(
        flightDetails.relationalFlights[
          flightDetails.relationalFlights.length - 1
        ].arrivalTime
      );

      const diffMilliseconds = Math.abs(departureTime - arrivalTime);
      const totalMinutes = Math.floor(diffMilliseconds / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours}h ${minutes}m`;
    }
  };

  const renderAirplaneDetails = (flightDetails, className) => {
    return (
      <div className={className} style={{ position: "relative" }}>
        <div className="col mt-2">
          <InfoIcon
            className="me-2"
            style={{
              color: "#00D1CD",
            }}
          />
          <strong>Airplane Info:</strong>
          <br />
          {flightDetails.airplane.type} - {flightDetails.airplane.model}
          <br />
          year: {flightDetails.airplane.yearManufactured}
          <br />
          range: {flightDetails.airplane.rangeKm} km
          <br />
          Max Speed: {flightDetails.airplane.maxSpeedKmh} km/h
          <br /> Seats: {flightDetails.seatsLeft} /{" "}
          {flightDetails.airplane.seats}
        </div>

        <div
          className="text-end"
          style={{
            position: "absolute",
            top: "0",
            right: "12px",
            textAlign: "right",
          }}
        >
          <WorkspacePremiumIcon
            className="me-2"
            style={{
              color: "#00D1CD",
            }}
          />
          <strong>Class:</strong>
          <br />
          {flightDetails.eclass.substring(0, 1).toUpperCase() +
            flightDetails.eclass
              .substring(1)
              .toLowerCase()
              .replaceAll("_", " ")}
        </div>
      </div>
    );
  };

  const isRelationalFlightsEmpty = () => {
    return (
      !flightDetails.relationalFlights ||
      flightDetails.relationalFlights.every(
        (item) => item === undefined || item === null
      ) ||
      flightDetails.relationalFlights.length === 0
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Flight Details:{" "}
          <b>
            {flightDetails.airline.iata_code} {flightDetails.flightNumber}
          </b>
          {!isRelationalFlightsEmpty() && (
            <>
              {flightDetails.relationalFlights.map((flight, index, array) => {
                const isLast = index === array.length - 1;
                return (
                  <span key={index}>
                    {(!isLast || (isLast && array.length === 1)) && " + "}
                    <b>
                      {`${flight.airline.iata_code} ${flight.flightNumber}`}
                    </b>
                  </span>
                );
              })}
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-center mb-4">Flight Information</h5>
        <div className="row">
          {/* Dashed Vertical Line */}
          {!isRelationalFlightsEmpty() && (
            <div
              style={{
                position: "absolute",
                right: "47%", // Position inside the Card
                height: "58%",
                top: "8%",
                width: "1px",
                borderLeft: "2px dashed black",
                background: "transparent", // Unikaj ukrywania przez inne warstwy
              }}
            ></div>
          )}

          {/* Flight Route */}
          {isRelationalFlightsEmpty()
            ? renderFlightRoute(flightDetails, "col-md-12")
            : renderFlightRoute(flightDetails, "col-md-6")}
          {isRelationalFlightsEmpty()
            ? null
            : renderFlightRoute(
                flightDetails.relationalFlights[
                  flightDetails.relationalFlights.length - 1
                ],
                "col-md-6"
              )}

          {/* Date */}
          {isRelationalFlightsEmpty()
            ? renderDate(flightDetails, "col-md-12")
            : renderDate(flightDetails, "col-md-6")}
          {isRelationalFlightsEmpty()
            ? null
            : renderDate(
                flightDetails.relationalFlights[
                  flightDetails.relationalFlights.length - 1
                ],
                "col-md-6"
              )}

          {/* Time */}
          {isRelationalFlightsEmpty()
            ? renderTime(flightDetails, "col-md-12")
            : renderTime(flightDetails, "col-md-6")}
          {isRelationalFlightsEmpty()
            ? null
            : renderTime(
                flightDetails.relationalFlights[
                  flightDetails.relationalFlights.length - 1
                ],
                "col-md-6"
              )}

          {/* Duration and Ticket Number */}
          {isRelationalFlightsEmpty()
            ? renderDuration(flightDetails, "col-md-12", false)
            : renderDuration(flightDetails, "col-md-6", false)}
          {isRelationalFlightsEmpty()
            ? null
            : renderDuration(
                flightDetails.relationalFlights[
                  flightDetails.relationalFlights.length - 1
                ],
                "col-md-6",
                true
              )}

          {/* Airplane Details */}
          {isRelationalFlightsEmpty()
            ? renderAirplaneDetails(flightDetails, "col-md-12")
            : renderAirplaneDetails(flightDetails, "col-md-6")}
          {isRelationalFlightsEmpty()
            ? null
            : renderAirplaneDetails(
                flightDetails.relationalFlights[
                  flightDetails.relationalFlights.length - 1
                ],
                "col-md-6"
              )}
        </div>

        {/* Passengers Details */}
        <br />
        <h5 className="text-center mb-3">Passengers Costs</h5>
        <Table striped bordered hover size="sm">
          <thead
            style={{
              border: "1px solid gray",
              borderBottom: "4px solid gray",
              // borderBottom: "1px solid gray",
            }}
          >
            <tr>
              <th></th>
              <th>Passenger</th>
              <th>{isRelationalFlightsEmpty() ? "" : "Departure"} Price</th>
              {isRelationalFlightsEmpty() ? null : <th>Arrival Price</th>}
            </tr>
          </thead>
          <tbody>
            <tr className="bordered">
              <td className="centered">
                <IoPerson
                  style={{
                    color: "#00D1CD",
                  }}
                />
              </td>
              <td>{"Adult"}</td>
              <td>{flightDetails.priceForAdult} PLN</td>
              {isRelationalFlightsEmpty() ? null : (
                <td>
                  {
                    flightDetails.relationalFlights[
                      flightDetails.relationalFlights.length - 1
                    ].priceForAdult
                  }{" "}
                  PLN
                </td>
              )}
            </tr>
            <tr className="bordered">
              <td className="centered">
                <TbMoodKidFilled
                  style={{
                    color: "#00D1CD",
                  }}
                />
              </td>
              <td>{"Child"}</td>
              <td>{flightDetails.priceForChild} PLN</td>
              {isRelationalFlightsEmpty() ? null : (
                <td>
                  {
                    flightDetails.relationalFlights[
                      flightDetails.relationalFlights.length - 1
                    ].priceForChild
                  }{" "}
                  PLN
                </td>
              )}
            </tr>
            <tr className="bordered">
              <td className="centered">
                <FaBaby
                  style={{
                    color: "#00D1CD",
                  }}
                />
              </td>
              <td>{"Infant"}</td>
              <td style={{ color: "green" }}>FREE!</td>
              {isRelationalFlightsEmpty() ? null : (
                <td style={{ color: "green" }}>FREE!</td>
              )}
            </tr>

            <tr className="bordered" style={{ borderTop: "4px solid gray" }}>
              <td className="centered">
                <MdLuggage
                  style={{
                    color: "#00D1CD",
                  }}
                />
              </td>
              <td>{"Hand Luggage"}</td>
              <td>{flightDetails.priceForHandLuggage} PLN</td>
              {isRelationalFlightsEmpty() ? null : (
                <td>
                  {
                    flightDetails.relationalFlights[
                      flightDetails.relationalFlights.length - 1
                    ].priceForHandLuggage
                  }{" "}
                  PLN
                </td>
              )}
            </tr>
            <tr className="bordered">
              <td className="centered">
                <FaLuggageCart
                  style={{
                    color: "#00D1CD",
                  }}
                />
              </td>
              <td>{"Checked Baggage"}</td>
              <td>{flightDetails.priceForCheckedLuggage} PLN</td>
              {isRelationalFlightsEmpty() ? null : (
                <td>
                  {
                    flightDetails.relationalFlights[
                      flightDetails.relationalFlights.length - 1
                    ].priceForCheckedLuggage
                  }{" "}
                  PLN
                </td>
              )}
            </tr>
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
