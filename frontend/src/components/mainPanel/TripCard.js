import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, Chip, Typography } from "@mui/material";
import { Flight } from "@mui/icons-material";
import FlightDetailsModal from "./FilghtDetailModal";
import { useState } from "react";

export default function TripCard() {
  const [showModal, setShowModal] = useState(false);
  const flightDetails = {
    departureCity: "Warsaw",
    departureAirport: "WAW",
    arrivalCity: "London",
    arrivalAirport: "LHR",
    date: "2024-12-15",
    time: "14:30",
    ticketNumber: "1234567890",
    passengers: [
      { name: "John Doe", type: "Adult", seat: "12A" },
      { name: "Jane Doe", type: "Child", seat: "12B" },
    ],
  };
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <FlightDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        flightDetails={flightDetails}
      />
      {/* Main Trip Card */}
      <Card
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
                    Thu 13.03.2025
                  </Typography>
                  <Chip
                    variant="outlined"
                    label="WizzAir"
                    sx={{
                      position: "relative",
                      top: 12,
                      fontSize: 42,
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
                          12:00
                        </Typography>
                      </div>
                    </div>

                    <div className="col-md-2 mt-2">
                      <div className="col mt-3 text-center">
                        <Typography
                          variant="h6"
                          sx={{ position: "absolute", top: 40 }}
                        >
                          KRK
                        </Typography>
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
                          1h 30m
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
                        <Typography
                          variant="h6"
                          sx={{ position: "absolute", top: 40, right: 195 }}
                        >
                          WAW
                        </Typography>
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
                          12:00
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
          200 PLN
        </Typography>
        <Typography variant="body2" align="center">
          for 3 passengers
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
              <FavoriteBorderIcon sx={{ marginTop: "5px" }} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
