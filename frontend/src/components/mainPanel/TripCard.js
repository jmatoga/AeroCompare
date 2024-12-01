import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, Chip, Tooltip, Typography } from "@mui/material";
import { Flight } from "@mui/icons-material";
import FlightDetailsModal from "./FilghtDetailModal";
import React, { useState } from "react";
import { format } from "date-fns";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { is } from "date-fns/locale";

export default function TripCard({
  key,
  flight,
  adults,
  children,
  infants,
  handLuggage,
  baggage,
}) {
  const passengersCount = adults + children + infants;

  const airportTooltipTitle = ({ airport }) => {
    return (
      <React.Fragment>
        <Typography color="inherit">
          {airport.iata_code} - {airport.country}, <b>{airport.city}</b>
          <br />({airport.name})
        </Typography>
      </React.Fragment>
    );
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      // maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const [showModal, setShowModal] = useState(false);

  const stopsLabel = () => {
    if (isRelationalFlightsEmpty()) {
      return "Direct";
    } else if (
      !isRelationalFlightsEmpty() &&
      flight.relationalFlights.length === 1
    ) {
      return "1 Stop";
    } else {
      return `${flight.relationalFlights.length} Stops`;
    }
  };

  const arrivalAirportLabel = () => {
    if (isRelationalFlightsEmpty()) {
      return flight.arrivalAirport.iata_code;
    } else {
      return flight.relationalFlights[flight.relationalFlights.length - 1]
        .arrivalAirport.iata_code;
    }
  };

  const handleDuration = () => {
    const departureTime = new Date(flight.departureTime);
    if (isRelationalFlightsEmpty()) {
      const arrivalTime = new Date(flight.arrivalTime);
      const durationInMs = Math.abs(arrivalTime - departureTime);
      const durationInMinutes = Math.floor(durationInMs / (1000 * 60)); // Łączna liczba minut
      const hours = Math.floor(durationInMinutes / 60); // Całkowita liczba godzin
      const minutes = durationInMinutes % 60; // Reszta minut

      return `${hours}h ${minutes}m`;
    } else {
      const arrivalTime = new Date(
        flight.relationalFlights[
          flight.relationalFlights.length - 1
        ].arrivalTime
      );

      const diffMilliseconds = Math.abs(departureTime - arrivalTime);
      const totalMinutes = Math.floor(diffMilliseconds / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours}h ${minutes}m`;
    }
  };

  const handlePrice = () => {
    let price =
      adults * flight.priceForAdult +
      children * flight.priceForChild +
      handLuggage * flight.priceForHandLuggage +
      baggage * flight.priceForCheckedLuggage;
    if (!isRelationalFlightsEmpty()) {
      flight.relationalFlights.forEach((relationalFlight) => {
        price +=
          adults * relationalFlight.priceForAdult +
          children * relationalFlight.priceForChild +
          handLuggage * relationalFlight.priceForHandLuggage +
          baggage * relationalFlight.priceForCheckedLuggage;
      });
    }
    return price;
  };

  const isRelationalFlightsEmpty = () => {
    return (
      !flight.relationalFlights ||
      flight.relationalFlights.every(
        (item) => item === undefined || item === null
      ) ||
      flight.relationalFlights.length === 0
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <FlightDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        flightDetails={flight}
      />
      {/* Main Trip Card */}
      <Card
        key={key}
        sx={{
          width: "80%",
          height: "140px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          border: "1px solid lightgray",
          borderRadius: "10px",
          overflow: "visible", // Upewnij się, że zawartość wychodząca nie jest obcinana
        }}
      >
        <CardActionArea
          onClick={() => setShowModal(true)}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <CardContent
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <div className="row">
              <div className="col-md-3 mt-2">
                <div className="col mt-3">
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ position: "absolute", top: 10 }}
                  >
                    {format(new Date(flight.departureTime), "EEE dd.MM.yyyy")}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      position: "absolute",
                      right: 15,
                      top: 5,
                      fontFamily:
                        "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", // Ustawiamy font-family
                      color: "gray",
                    }}
                  >
                    {/* Wybieranie która klasa jest głównie albo pierwszy i tooltip  */}
                    {flight.eclass.substring(0, 1).toUpperCase() +
                      flight.eclass
                        .substring(1)
                        .toLowerCase()
                        .replaceAll("_", " ")}
                  </Typography>
                  <Chip
                    variant="outlined"
                    label={
                      flight.airline !== null ? flight.airline.name : "NULL"
                    }
                    sx={{
                      position: "relative",
                      top: 12,
                      fontSize: 29,
                      borderWidth: 3,
                      height: 50,
                    }}
                  />
                </div>
              </div>
              <div className="col-md-9 mt-2">
                <div className="col mt-3 text-center">
                  <div className="row">
                    {/* Flight Details */}
                    <div className="col-md-3 mt-2">
                      <div className="col mt-3">
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ position: "relative", top: -10 }}
                        >
                          {new Date(flight.departureTime).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </Typography>
                      </div>
                    </div>

                    <div className="col-md-2 mt-2">
                      <div className="col mt-3 text-center">
                        <HtmlTooltip
                          title={airportTooltipTitle({
                            airport: flight.departureAirport,
                          })}
                          disableFocusListener
                          arrow
                          sx={{ fontSize: 20 }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ position: "absolute", top: 40 }}
                          >
                            {flight.departureAirport.iata_code}
                          </Typography>
                        </HtmlTooltip>
                        <RemoveIcon
                          sx={{
                            fontSize: 20,
                            transform:
                              "scaleX(12) translateY(-4px) translateX(-2px)",
                            fontWeight: "bold",
                            color: "#00D1CD",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-2 mt-2 p-0">
                      <div className="col mt-3 text-center">
                        <Typography
                          variant="h7"
                          sx={{
                            position: "relative",
                            top: -30,
                            fontWeight: "bold",
                          }}
                        >
                          {handleDuration()}
                        </Typography>
                        <Chip
                          variant="outlined"
                          label={stopsLabel()}
                          sx={{
                            position: "relative",
                            top: -30,
                            fontSize: 22,
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-2 mt-2">
                      <div className="col mt-3 text-center">
                        <HtmlTooltip
                          title={airportTooltipTitle({
                            airport: isRelationalFlightsEmpty()
                              ? flight.arrivalAirport
                              : flight.relationalFlights[
                                  flight.relationalFlights.length - 1
                                ].arrivalAirport,
                          })}
                          disableFocusListener
                          arrow
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              position: "absolute",
                              top: 40,
                              right: 195,
                            }}
                          >
                            {arrivalAirportLabel()}
                          </Typography>
                        </HtmlTooltip>
                        <RemoveIcon
                          sx={{
                            fontSize: 20,
                            transform:
                              "scaleX(12) translateY(-4px) translateX(2px)",
                            fontWeight: "bold",
                            color: "#00D1CD",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-3 mt-2">
                      <div className="col mt-3">
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ position: "relative", top: -10 }}
                        >
                          {new Date(
                            isRelationalFlightsEmpty()
                              ? flight.arrivalTime
                              : flight.relationalFlights[
                                  flight.relationalFlights.length - 1
                                ].arrivalTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CardActionArea>

        {/* Dashed Vertical Line */}
        <div
          style={{
            position: "absolute",
            right: "-1px", // Position inside the Card
            height: "90%",
            top: "5%",
            width: "1px",
            borderLeft: "2px dashed black",
            background: "transparent", // Unikaj ukrywania przez inne warstwy
          }}
        ></div>
      </Card>

      {/* Price Card */}
      <Card
        sx={{
          width: "20%",
          height: "140px",
          border: "1px solid lightgray",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
        }}
      >
        <Typography variant="h4" align="center">
          {handlePrice()} PLN
        </Typography>
        <Typography variant="body2" align="center">
          for {passengersCount} passenger{passengersCount > 1 ? "s" : ""}
        </Typography>
        {/* <Typography variant="body2" align="center">
          and 2 hand Luggage and 1 checked baggage
        </Typography> */}
        <div className="row">
          <div className="col-md-9 mt-2">
            <div className="col text-center">
              <Button
                variant="contained"
                color="success"
                onClick={() => (window.location.href = flight.bookingLink)}
                sx={{
                  fontFamily:
                    "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", // Ustawiamy font-family
                }}
              >
                Book now!
              </Button>
            </div>
          </div>
          <div className="col-md-3 mt-2">
            <div className="col text-center">
              <Tooltip title="Add to favourites" disableFocusListener arrow>
                <FavoriteBorderIcon sx={{ marginTop: "5px" }} />
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
