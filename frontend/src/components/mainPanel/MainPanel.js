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
import { getRequest, getRequestWithParams } from "../axios_helper";
import PassengersModal from "./PassengersModal";
import MultiChoice from "./MultiChoice";
import { BsFillPeopleFill, BsFillLuggageFill } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import DatePicker from "./DatePicker";
import backgroundImage from "../../resources/2.jpg";
import Footer from "../footer/Footer";
import {
  Slider,
  Box,
  Typography,
  Checkbox,
  TextField,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import ButtonMaterial from "@mui/material/Button";
import { HourSlider, PriceSlider, TripTimeSlider } from "./Slider";
import CustomCheckbox from "./CustomCheckBox.js";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AirportSelect from "./AirportSelect.js";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TripCard from "./TripCard.js";
import Pagination from "@mui/material/Pagination";
import SplitButton from "./SplitButton.js";

export default function MainPanel() {
  {
    /* Trip Type, Stops, Modal */
  }
  const [tripType, setTripType] = useState("one-way");
  const [stops, setStops] = useState("Any number of stops");
  const [showModal, setShowModal] = useState(false);

  {
    /* Passengers */
  }
  const [passengersCount, setPassengersCount] = useState(0);
  const [childrensCount, setChildrensCount] = useState(0);
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

  const [departureAirportList, setDepartureAirportList] = useState([]);
  const [arrivalAirportList, setArrivalAirportList] = useState([]);

  {
    /* Date */
  }
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);

  {
    /* Airlines */
  }
  const [airlines, setAirlines] = useState([]);
  const [airlinesList, setAirlinesList] = useState([]);

  {
    /* Classes */
  }
  const [classes, setClasses] = useState([]);
  const [classesList, setClassesList] = useState([]);

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
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);

  const [selectedReturnDays, setSelectedReturnDays] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);

  {
    /* Trip Time */
  }
  const [tripTimeValue, setTripTimeValue] = useState(60);
  const [tripTimeReturnValue, setTripTimeReturnValue] = useState(60);

  {
    /* Flights */
  }
  const [flights, setFlights] = useState([]);

  {
    /* Pagination */
  }
  const [currentPage, setCurrentPage] = useState(1); // MUI Pagination zaczyna od 1
  const [totalPages, setTotalPages] = useState(1);

  {
    /* useEffects */
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(currentPage);
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const [airportsResponse, airlinesResponse, classesResponse] =
        await Promise.all([
          getRequest("api/getAllAirports"),
          getRequest("api/getAllAirlines"),
          getRequest("api/getAllClasses"),
        ]);

      // Zaktualizowanie danych dla airportów
      setDepartureAirportData(airportsResponse.data);
      setArrivalAirportData(airportsResponse.data);

      setAirlines([{ id: "123", name: "ALL" }, ...airlinesResponse.data]);
      setAirlinesList([
        { label: "ALL", value: { id: "123", name: "ALL" }, key: "123" },
      ]);

      let i = 0;
      setClasses([
        { id: "123", name: "ALL" },
        ...classesResponse.data.map((name) => ({
          id: i++,
          name: name
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()), // Kapitalizacja pierwszej litery lub pierwszej po spacji
        })),
      ]);
      setClassesList([
        { label: "ALL", value: { id: "123", name: "ALL" }, key: "123" },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async (page) => {
    const params = new URLSearchParams({
      page: page - 1, // Spring używa indeksu od 0
      size: 5, // Liczba elementów na stronę
      departureDate:
        selectedDepartureDate !== null ? selectedDepartureDate : "",
      airlines: selectedDepartureDate !== "ALL" ? selectedDepartureDate : "",
    });

    departureAirportList.forEach((airport) => {
      params.append("airportIdDTOList", airport.value.id);
    });

    const [flightsResponse] = await Promise.all([
      getRequestWithParams("api/getAllFlights", { params }),
    ]);

    // Zaktualizowanie danych dla airportów
    setFlights(flightsResponse.data.content);
    setTotalPages(flightsResponse.data.totalPages);
  };

  const handleChangeSelectedReturnDays = (day, event) => {
    setSelectedReturnDays((prevSelectedDays) => {
      if (event.target.checked) {
        return [...prevSelectedDays, day]; // Add day to the list
      } else {
        return prevSelectedDays.filter((item) => item !== day); // Remove day from the list
      }
    });
  };

  const handleChangeSelectedDays = (day, event) => {
    setSelectedDays((prevSelectedDays) => {
      if (event.target.checked) {
        return [...prevSelectedDays, day]; // Add day to the list
      } else {
        return prevSelectedDays.filter((item) => item !== day); // Remove day from the list
      }
    });
  };

  const handleDepartureOrReturn = (event, newValue) => {
    setDepartureOrReturnValue(newValue);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  {
    /* Renders */
  }
  const RenderTimeSlider = (tripTimeValue, setTripTimeValue) => (
    <>
      {/* Trip Time */}
      <div className="col-md-3 mt-2">
        <div className="col mt-3">
          <TripTimeSlider
            label="Trip time"
            value={tripTimeValue}
            setValue={setTripTimeValue}
          />
        </div>
      </div>
    </>
  );

  const RenderDepartureDays = (selectedDays, handleChangeCheckedDays) => (
    <>
      {/* Departure Days */}
      <div className="col-md-3 mt-2 px-2">
        <div className="col mt-3">
          <Form.Label>Departure Days:</Form.Label>
          <br />
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <CustomCheckbox
              key={day}
              label={day}
              checked={selectedDays.includes(day)}
              handleChange={(event) => handleChangeCheckedDays(day, event)}
            />
          ))}
        </div>
      </div>
    </>
  );

  const RenderSliders = (
    departureValue,
    setDepartureValue,
    arrivalValue,
    setArrivalValue,
    margin = "col-md-3 mt-2"
  ) => (
    <>
      {/* Departure Time */}
      <div className={margin}>
        <div className="col mt-3">
          <HourSlider
            label="Departure"
            value={departureValue}
            setValue={setDepartureValue}
          />
        </div>
      </div>

      {/* Arrival Time */}
      <div className={margin}>
        <div className="col mt-3">
          <HourSlider
            label="Arrival"
            value={arrivalValue}
            setValue={setArrivalValue}
          />
        </div>
      </div>
    </>
  );

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
                <h1>Aero Compare</h1>
                <p>Your personal airline ticket comparator</p>
              </Col>

              {/* Options for trip type, passengers, and baggage */}
              <Col>
                <Form>
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Trip Type Selection */}
                    <div className="ms-3 d-flex align-items-center">
                      <ButtonGroup
                        variant="contained"
                        aria-label="Basic button group"
                      >
                        <Button
                          onClick={() => setTripType("one-way")}
                          variant={
                            tripType === "one-way" ? "primary" : "secondary"
                          }
                        >
                          ONE-WAY
                        </Button>
                        <Button
                          onClick={() => setTripType("return")}
                          variant={
                            tripType === "return" ? "primary" : "secondary"
                          }
                        >
                          RETURN
                        </Button>
                      </ButtonGroup>
                    </div>

                    {/* Stops */}
                    <div className="ms-3 d-flex align-items-center">
                      <SplitButton setStops={setStops} />
                    </div>

                    {/* Search */}
                    <div className="ms-3 d-flex align-items-center">
                      <FormControl sx={{ m: 1, width: 135 }}>
                        <ButtonMaterial
                          variant="contained"
                          color="success"
                          onClick={() => handleSearch(currentPage)}
                        >
                          Search
                        </ButtonMaterial>
                      </FormControl>
                    </div>

                    {/* Passenger and Baggage Selection Button */}
                    <div className="ms-3 d-flex align-items-center">
                      <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                        className="d-flex align-items-center"
                      >
                        <BsFillPeopleFill /> {"\u00A0"}
                        {passengersCount + childrensCount + infantsCount}
                        {"\u00A0\u00A0\u00A0" /* Spacing between icons */}
                        <BsFillLuggageFill /> {"\u00A0"}
                        {handLuggageCount + baggageCount}
                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                        <FaCaretDown />
                      </Button>
                    </div>
                  </div>

                  {/* Passengers Modal */}
                  <PassengersModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    passengersCount={passengersCount}
                    setPassengersCount={setPassengersCount}
                    childrensCount={childrensCount}
                    setChildrensCount={setChildrensCount}
                    infantsCount={infantsCount}
                    setInfantsCount={setInfantsCount}
                    handLuggageCount={handLuggageCount}
                    setHandLuggageCount={setHandLuggageCount}
                    baggageCount={baggageCount}
                    setBaggageCount={setBaggageCount}
                  />
                </Form>
              </Col>
            </Row>

            {/* Komponent Filtrów */}
            <Form className="mb-3">
              <Form.Group>
                <div className="row">
                  {/* Departure Airport */}
                  <AirportSelect
                    label="Departure"
                    className={
                      tripType === "one-way" ? "col-md-4 mt-2" : "col-md-3 mt-2"
                    }
                    airport={departureAirport}
                    airportList={departureAirportList}
                    setAirportList={setDepartureAirportList}
                  />

                  {/* Arrival Airport */}
                  {tripType === "return" && (
                    <AirportSelect
                      label="Arrival"
                      airport={arrivalAirport}
                      airportList={arrivalAirportList}
                      setAirportList={setArrivalAirportList}
                    />
                  )}

                  {/* Departure Date */}
                  <DatePicker
                    label="Departure Date"
                    className={
                      tripType === "one-way" ? "col-md-4 mt-2" : "col-md-3 mt-2"
                    }
                    selectedDate={selectedDepartureDate}
                    setSelectedDate={setSelectedDepartureDate}
                  />

                  {/* Return Date */}
                  {tripType === "return" && (
                    <DatePicker
                      label="Return Date"
                      // className={
                      //   selectedOption === "one-way"
                      //     ? "col-md-4 mt-2"
                      //     : "col-md-3 mt-2"
                      // }
                      selectedDate={selectedReturnDate}
                      setSelectedDate={setSelectedReturnDate}
                    />
                  )}
                </div>
              </Form.Group>

              <Accordion
                defaultExpanded
                sx={{
                  background: "linear-gradient(45deg, #f5f5f5, #e0e0e0)",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    minHeight: "56px", // Stała wysokość
                    height: "56px", // Zapobiega zmianie rozmiaru
                    "&.Mui-expanded": { height: "56px", top: "0" }, // Zachowuje wysokość po rozwinięciu
                  }}
                >
                  <Typography
                    variant="h5"
                    // sx={{fontWeight: "bold" }}
                  >
                    More Filters
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ paddingTop: "0px", borderTop: "1px solid darkgray" }}
                >
                  <Form.Group>
                    <div className="row">
                      {/* Airlines */}
                      <div className="col-md-3 mt-2">
                        <div className="col mt-2">
                          <MultiChoice
                            label="Airlines"
                            entities={airlines}
                            entitiesList={airlinesList}
                            setEntitesList={setAirlinesList}
                          />
                        </div>
                      </div>

                      {/* Classes */}
                      <div className="col-md-3 mt-2">
                        <div className="col mt-2">
                          <MultiChoice
                            label="Classes"
                            entities={classes}
                            entitiesList={classesList}
                            setEntitesList={setClassesList}
                          />
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-md-6 mt-2">
                        <div className="col mt-2">
                          <PriceSlider
                            value={priceValue}
                            setValue={setPriceValue}
                            valuetext={(value) => `${value} PLN`}
                          />
                        </div>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <div className="row">
                      {tripType === "return" ? (
                        <Box
                          sx={{
                            width: "100%",
                            typography: "body1",
                            marginTop: "10px",
                          }}
                        >
                          <TabContext value={departureOrReturnValue}>
                            <Box
                              sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                              <TabList onChange={handleDepartureOrReturn}>
                                <Tab label="Departure" value="1" />
                                <Tab label="Return" value="2" />
                              </TabList>
                            </Box>

                            {/* Departure */}
                            <TabPanel value="1" sx={{ padding: 0 }}>
                              <div className="row">
                                {RenderSliders(
                                  hourDepartureValue,
                                  setHourDepartureValue,
                                  hourArrivalValue,
                                  setHourArrivalValue
                                )}
                                {RenderDepartureDays(
                                  selectedDays,
                                  handleChangeSelectedDays
                                )}
                                {RenderTimeSlider(
                                  tripTimeValue,
                                  setTripTimeValue
                                )}
                              </div>
                            </TabPanel>

                            {/* Return */}
                            <TabPanel value="2" sx={{ padding: 0 }}>
                              <div className="row">
                                {RenderSliders(
                                  hourDepartureReturnValue,
                                  setHourDepartureReturnValue,
                                  hourArrivalReturnValue,
                                  setHourArrivalReturnValue
                                )}
                                {RenderDepartureDays(
                                  selectedReturnDays,
                                  handleChangeSelectedReturnDays
                                )}
                                {RenderTimeSlider(
                                  tripTimeReturnValue,
                                  setTripTimeReturnValue
                                )}
                              </div>
                            </TabPanel>
                          </TabContext>
                        </Box>
                      ) : (
                        <>
                          <div className="row">
                            {RenderSliders(
                              hourDepartureValue,
                              setHourDepartureValue,
                              hourArrivalValue,
                              setHourArrivalValue
                            )}
                            {RenderDepartureDays(
                              selectedDays,
                              handleChangeSelectedDays
                            )}
                            {RenderTimeSlider(tripTimeValue, setTripTimeValue)}
                          </div>
                        </>
                      )}
                    </div>
                  </Form.Group>
                </AccordionDetails>
              </Accordion>
            </Form>
          </div>

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
                  gap: "10px", // Daje odstęp pomiędzy elementami
                }}
              >
                {flights.map((flight) => (
                  <TripCard
                    key={flight.id}
                    flight={flight}
                    adults={passengersCount}
                    childrens={childrensCount}
                    infants={infantsCount}
                    handLuggage={handLuggageCount}
                    baggage={baggageCount}
                  />
                ))}
                {flights.length === 0 && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="200px"
                  >
                    <Typography variant="h3" align="center">
                      No results for the selected filters
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </ListGroup>

          {/* {displayedTickets.length > 0 ? (
              displayedTickets.map((ticket, index) => (
                <ListGroup.Item key={index}>
                  <strong>{ticket.destination}</strong> - {ticket.airline} -{" "}
                  {ticket.price} PLN
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>Brak wyników dla podanych filtrów</ListGroup.Item>
            )} */}
          {/* </ListGroup> */}

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
          />
        </div>
      </Container>
      <Footer className="footer" />
    </div>
  );
}
