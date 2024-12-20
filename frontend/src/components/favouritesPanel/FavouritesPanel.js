import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  ButtonGroup,
  ListGroup,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
// import Select from "react-select";
import { getRequest, getRequestWithParams } from "../axios_helper.js";
import PassengersModal from "../mainPanel/PassengersModal.js";
import MultiChoice from "../mainPanel/MultiChoice.js";
import { BsFillPeopleFill, BsFillLuggageFill } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import DatePicker from "../mainPanel/DatePicker.js";
import backgroundImage from "../../resources/2.jpg";
import Footer from "../footer/Footer.js";
import {
  Slider,
  Box,
  Typography,
  Checkbox,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ButtonMaterial from "@mui/material/Button";
import {
  HourSlider,
  PriceSlider,
  TripTimeSlider,
} from "../mainPanel/Slider.js";
import CustomCheckbox from "../mainPanel/CustomCheckBox.js";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AirportSelect from "../mainPanel/AirportSelect.js";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FavouritesCard from "./FavouritesCard.js";
import Pagination from "@mui/material/Pagination";
import SplitButton from "../mainPanel/SplitButton.js";
import AeroCompareLogo from "../../resources/aero-compare-high-resolution-logo.png";
import AeroCompareLogo1 from "../../resources/aero.png";

export default function FavourititesPanel() {
  {
    /* Trip Type, Stops, Modal */
  }
  const [tripType, setTripType] = useState("one-way");
  const [stops, setStops] = useState();

  {
    /* Passengers */
  }
  const [passengersCount, setPassengersCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  {
    /* Baggage */
  }
  const [handLuggageCount, setHandLuggageCount] = useState(0);
  const [baggageCount, setBaggageCount] = useState(0);

  {
    /* Airports */
  }
  const [departureAirport, setDepartureAirportData] = useState([]);
  const [arrivalAirport, setArrivalAirportData] = useState([]);

  {
    /* Date */
  }
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);

  {
    /* Airlines */
  }
  const [airlines, setAirlines] = useState([]);

  {
    /* Classes */
  }
  const [classes, setClasses] = useState([]);

  {
    /* Price */
  }
  const [priceValue, setPriceValue] = useState([0, 15000]);

  {
    /* Time */
  }
  const [departureOrReturnValue, setDepartureOrReturnValue] = useState("1");

  const [hourDepartureValue, setHourDepartureValue] = useState([0, 24]);
  const [hourArrivalValue, setHourArrivalValue] = useState([0, 24]);

  const [hourDepartureReturnValue, setHourDepartureReturnValue] = useState([
    0, 24,
  ]);
  const [hourArrivalReturnValue, setHourArrivalReturnValue] = useState([0, 24]);

  {
    /* Departure Days */
  }
  const [selectedDays, setSelectedDays] = useState([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]);

  const [selectedReturnDays, setSelectedReturnDays] = useState([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]);

  {
    /* Trip Time */
  }
  const [tripTimeValue, setTripTimeValue] = useState(60);
  const [tripTimeReturnValue, setTripTimeReturnValue] = useState(60);

  {
    /* Pagination */
  }
  const [currentPage, setCurrentPage] = useState(1); // MUI Pagination zaczyna od 1
  const [totalPages, setTotalPages] = useState(1);

  {
    /* Sorters */
  }
  const [sortByPrice, setSortByPrice] = useState(true);
  const [sortByTripTime, setSortByTripTime] = useState(true);
  const [sortByTripTimeReturn, setSortByTripTimeReturn] = useState(true);
  const [sortByDepartureTime, setSortByDepartureTime] = useState(true);
  const [sortByDepartureTimeReturn, setSortByDepartureTimeReturn] =
    useState(true);
  const [sortByArrivalTime, setSortByArrivalTime] = useState(true);
  const [sortByArrivalTimeReturn, setSortByArrivalTimeReturn] = useState(true);

  const [favourites, setFavourites] = useState([]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [favouritesResponse] = await Promise.all([
        getRequest("api/favourites"),
      ]);

      setFavourites(favouritesResponse.data);
      console.log(favouritesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // minHeight: "94vh", // Cała wysokość widoczna w przeglądarce
        height: "94vh", // Cała wysokość widoczna w przeglądarce
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowY: "auto", // Dodaj to, aby umożliwić przewijanie
      }}
    >
      <Container className="mt-4" style={{ flex: 1 }}>
        <div
          className="card p-4 shadow-sm"
          style={{ maxWidth: "1500px", width: "100%" }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 100, // Aby był nad innymi elementami
              background: "white", // Zapobiega nachodzeniu tła
              // boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // Lekki cień
              // transform: "translateX(1.1)", // Zapobiega rozmazywaniu tekstu
            }}
          >
            <Row className="align-items-center">
              {/* Title and Description */}
              <Col md="auto">
                <div
                  style={{
                    width: "300px",
                    height: "150px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={AeroCompareLogo1}
                    alt="Aero Compare Logo"
                    style={{
                      // transform: "scale(1.5) translateY(-10%)",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </Col>
              <Col md="auto">
                <Typography variant="h2" className="mb-4">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Favourites
                </Typography>
              </Col>
            </Row>
            {/* Lista wyników porównania */}
            <ListGroup
              className="mb-4"
              style={{
                padding: "0",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <Card
                sx={{
                  minHeight: "200px",
                  height: "auto",
                  overflow: "hidden",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    overflowY: "auto",
                    overflow: "hidden",
                    display: "flex", // Wymaga, aby kontener był flex
                    flexDirection: "column", // Ustawia elementy w kolumnie
                    gap: "-20px", // Daje odstęp pomiędzy elementami
                  }}
                >
                  {favourites.map((favourite) => (
                    <FavouritesCard key={favourite.id} favourite={favourite} />
                  ))}
                  {favourites.length === 0 && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="200px"
                    >
                      <Typography variant="h3" align="center">
                        No favourites found
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </ListGroup>
            {/* Komponent paginacji */}
            <Pagination
              count={totalPages} // Liczba stron
              page={currentPage} // Aktualna strona
              color="primary"
              showFirstButton
              showLastButton
              onChange={handlePageChange} // Obsługa zmiany strony
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              sx={{
                "& .MuiPaginationItem-text": {
                  color: "#00D1CD",
                },
                "& .MuiPaginationItem-previousNext": {
                  color: "#00D1CD", // Kolor strzałek previous i next
                },
                "& .MuiPaginationItem-page": {
                  color: "#00D1CD", // Kolor tekstu numeru strony
                },
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#00D1CD", // Kolor tła numeru strony w wybranym stanie
                  color: "white", // Kolor tekstu dla wybranego numeru strony
                },
              }}
            />
          </div>
        </div>
      </Container>
      <Footer className="footer" />
    </div>
  );
}
