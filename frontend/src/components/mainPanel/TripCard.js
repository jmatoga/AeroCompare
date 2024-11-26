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

export default function TripCard({
  key,
  flight,
  adults,
  childrens,
  infants,
  handLuggage,
  baggage,
}) {
  const passengersCount = adults + childrens + infants;

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
                            color: "blue",
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
                          {flight.durationHours}h {flight.durationMinutes}m
                        </Typography>
                        <Chip
                          variant="outlined"
                          label="Directly"
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
                            airport: flight.arrivalAirport,
                          })}
                          disableFocusListener
                          arrow
                        >
                          <Typography
                            variant="h6"
                            sx={{ position: "absolute", top: 40, right: 195 }}
                          >
                            {flight.arrivalAirport.iata_code}
                          </Typography>
                        </HtmlTooltip>
                        <RemoveIcon
                          sx={{
                            fontSize: 20,
                            transform:
                              "scaleX(12) translateY(-4px) translateX(2px)",
                            fontWeight: "bold",
                            color: "blue",
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
                          {new Date(flight.arrivalTime).toLocaleTimeString([], {
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
          {adults * flight.priceForAdult +
            childrens * flight.priceForChild +
            handLuggage * flight.priceForHandLuggage +
            baggage * flight.priceForCheckedLuggage}{" "}
          PLN
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
              <Button variant="contained" color="success">
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
