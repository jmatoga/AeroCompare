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
import {
  getRequest,
  getRequestWithParams,
  postRequestWithParams,
} from "../axios_helper";
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
  ThemeProvider,
  createTheme,
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
import AeroCompareLogo1 from "../../resources/aero.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function MainPanel() {
  const [sortOptions, setSortOptions] = useState([
    { field: "price", ascending: true }, // Domyślne kryterium: cena rosnąco
  ]);

  {
    /* Trip Type, Stops, Modal */
  }
  const [tripType, setTripType] = useState("one-way");
  const [stops, setStops] = useState();
  const [showModal, setShowModal] = useState(false);

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
    /* Flights */
  }
  const [flights, setFlights] = useState([]);

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

  const theme = createTheme({
    palette: {
      primary: {
        // main: "#0ab9b6",
        main: "#00D1CD",
      },
    },
  });

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
          getRequest("api/airports"),
          getRequest("api/airlines"),
          getRequest("api/classes"),
        ]);
      console.log(airportsResponse.data);
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
          name: name,
        })),
      ]);
      setClassesList([
        { label: "ALL", value: { id: "123", name: "ALL" }, key: "123" },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createParameters = (params) => {
    departureAirportList.forEach((airport) => {
      params.append("departureAirportIdList", airport.value.id);
    });

    arrivalAirportList.forEach((airport) => {
      params.append("arrivalAirportIdList", airport.value.id);
    });

    if (selectedDepartureDate !== null) {
      const correctedDate = new Date(selectedDepartureDate);
      correctedDate.setDate(correctedDate.getDate() + 1); // Add 1 day

      params.append("departureDate", correctedDate.toISOString().split("T")[0]);
    }

    airlinesList
      .filter((airline) => airline.key !== "123")
      .forEach((airline) => {
        params.append("airlinesIdList", airline.value.id);
      });

    classesList
      .filter((clazz) => clazz.key !== "123")
      .forEach((clazz) => {
        params.append("classesList", clazz.value.name);
      });

    if (priceValue[0] > 0) {
      params.append("minPrice", priceValue[0]);
    }
    if (priceValue[1] < 15000) {
      params.append("maxPrice", priceValue[1]);
    }

    function formatHourToIsoString(hour) {
      const date = new Date();
      date.setHours(hour + 1, 0, 0, 0);
      return date.toISOString().split("T")[1].split(".")[0];
    }

    if (hourDepartureValue[0] > 0) {
      params.append(
        "departureTimeStart",
        formatHourToIsoString(hourDepartureValue[0])
      );
    }
    if (hourDepartureValue[1] < 24) {
      params.append(
        "departureTimeEnd",
        formatHourToIsoString(hourDepartureValue[1])
      );
    }

    if (hourArrivalValue[0] > 0) {
      params.append(
        "arrivalTimeStart",
        formatHourToIsoString(hourArrivalValue[0])
      );
    }
    if (hourArrivalValue[1] < 24) {
      params.append(
        "arrivalTimeEnd",
        formatHourToIsoString(hourArrivalValue[1])
      );
    }

    selectedDays.forEach((day) => {
      params.append("departureDays", day);
    });

    if (tripTimeValue < 60) {
      params.append("tripTime", tripTimeValue);
    }

    const sorters = [
      sortByPrice,
      sortByTripTime,
      sortByDepartureTime,
      sortByArrivalTime,
      sortByTripTimeReturn,
      sortByDepartureTimeReturn,
      sortByArrivalTimeReturn,
    ];

    sorters.forEach((sorter) => {
      // if (!sorter) {
      params.append("sortersList", sorter);
      // }
    });

    if (stops) {
      params.append("stopNumber", stops.replaceAll(" ", "_"));
    }

    return params;
  };

  const handleSearch = async (page) => {
    const paramsStart = new URLSearchParams({
      page: page - 1, // Spring używa indeksu od 0
      size: 5, // Liczba elementów na stronę
      passengersCount: passengersCount,
      childrenCount: childrenCount,
      handLuggageCount: handLuggageCount,
      baggageCount: baggageCount,
    });

    const params = createParameters(paramsStart);

    // Wysłanie zapytania
    const [flightsResponse] = await Promise.all([
      getRequestWithParams("api/flights", { params }),
    ]);

    // const flightsResponseMappedToRelationalFlights = response.data.content.map(
    //   (flight) => ({
    //     ...flight,
    //     relationalFlights: flight.relationalFlights
    //       ? [...flight.relationalFlights]
    //       : [],
    //   })
    // );
    // // const relationalFlights3 = flightsResponse1.map(
    // //   (flight) => flight.relationalFlights
    // // );
    // setRelationalFlights(flightsResponseMappedToRelationalFlights);
    setFlights(flightsResponse.data.content);
    setTotalPages(flightsResponse.data.totalPages);
  };

  const saveFavourites = async () => {
    const paramsStart = new URLSearchParams({
      passengersCount: passengersCount,
      childrenCount: childrenCount,
      infantsCount: infantsCount,
      handLuggageCount: handLuggageCount,
      baggageCount: baggageCount,
    });

    const params = createParameters(paramsStart);

    // Wysłanie zapytania
    const [favourititesResponse] = await Promise.all([
      postRequestWithParams("api/favourites", { params }),
    ]);
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
  const RenderTimeSlider = (
    tripTimeValue,
    setTripTimeValue,
    sortByTripTime,
    setSortByTripTime
  ) => (
    <>
      {/* Trip Time */}
      <div className="col-md-3 mt-2">
        <div className="col mt-3">
          <TripTimeSlider
            label="Trip time"
            value={tripTimeValue}
            setValue={setTripTimeValue}
            sortByTripTime={sortByTripTime}
            setSortByTripTime={setSortByTripTime}
          />
        </div>
      </div>
    </>
  );

  const RenderDepartureDays = (selectedDays, handleChangeCheckedDays) => (
    <>
      {/* Departure Days */}
      <div
        className="col-md-3 mt-2 px-0"
        style={{
          paddingLeft: "2px !important",
          paddingRight: "0px !important",
        }}
      >
        <div className="col mt-3">
          <Form.Label>Departure Days:</Form.Label>
          <br />
          {[
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
          ].map((day) => (
            <CustomCheckbox
              key={day}
              label={
                day.substring(0, 1).toUpperCase() +
                day.substring(1, 3).toLowerCase()
              }
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
    sortByDepartureTime,
    setSortByDepartureTime,
    sortByArrivalTime,
    setSortByArrivalTime,
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
            sortByTime={sortByDepartureTime}
            setSortByTime={setSortByDepartureTime}
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
            sortByTime={sortByArrivalTime}
            setSortByTime={setSortByArrivalTime}
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
                {/* <h1>Aero Compare</h1>
                <p>Your personal airline ticket comparator</p> */}
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
                          style={{
                            backgroundColor:
                              tripType === "one-way" ? "#00D1CD" : "#808080", // Tło
                            color: "#fff", // Kolor tekstu
                            fontWeight: "bold", // Pogrubienie tekstu
                            border: `2px solid ${
                              tripType === "one-way" ? "#00D1CD" : "#808080"
                            }`, // Obramowanie w tym samym kolorze
                            boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`, // Efekt cienia
                            borderTopLeftRadius: "7px", // Zaokrąglenie tylko lewego górnego rogu
                            borderBottomLeftRadius: "7px", // Zaokrąglenie tylko lewego dolnego rogu
                            transition: "all 0.3s ease", // Płynna zmiana dla efektów hover
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.boxShadow = `0 6px 12px rgba(0, 0, 0, 0.3)`)
                          } // Cień przy najechaniu
                          onMouseOut={(e) =>
                            (e.currentTarget.style.boxShadow = `0 4px 8px rgba(0, 0, 0, 0.2)`)
                          } // Przywrócenie cienia
                        >
                          ONE-WAY
                        </Button>
                        <Button
                          onClick={() => setTripType("return")}
                          style={{
                            backgroundColor:
                              tripType === "return" ? "#00D1CD" : "#808080", // Tło
                            color: "#fff", // Kolor tekstu
                            fontWeight: "bold", // Pogrubienie tekstu
                            border: `2px solid ${
                              tripType === "return" ? "#00D1CD" : "#808080"
                            }`, // Obramowanie w tym samym kolorze
                            boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`, // Efekt cienia
                            borderTopRightRadius: "7px", // Zaokrąglenie tylko prawego górnego rogu
                            borderBottomRightRadius: "7px", // Zaokrąglenie tylko prawego dolnego rogu
                            transition: "all 0.3s ease", // Płynna zmiana dla efektów hover
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.boxShadow = `0 6px 12px rgba(0, 0, 0, 0.3)`)
                          } // Cień przy najechaniu
                          onMouseOut={(e) =>
                            (e.currentTarget.style.boxShadow = `0 4px 8px rgba(0, 0, 0, 0.2)`)
                          } // Przywrócenie cienia
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
                          style={{
                            fontSize: "16px",
                            fontFamily:
                              "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
                          }}
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
                        <BsFillPeopleFill /> {"\u00A0"}
                        {passengersCount + childrenCount + infantsCount}
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
                    childrenCount={childrenCount}
                    setChildrenCount={setChildrenCount}
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
                  <AirportSelect
                    label="Arrival"
                    className={
                      tripType === "one-way" ? "col-md-4 mt-2" : "col-md-3 mt-2"
                    }
                    airport={arrivalAirport}
                    airportList={arrivalAirportList}
                    setAirportList={setArrivalAirportList}
                  />

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
                    sx={{
                      // fontWeight: "bold",
                      fontFamily:
                        "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", // Ustawiamy font-family
                      marginRight: "10px",
                    }}
                  >
                    More Filters
                  </Typography>
                  {/* Przycisk <3 na prawo, na tej samej wysokości co More Filters */}
                  <Button
                    variant="text"
                    onClick={(e) => {
                      e.stopPropagation(); // Zatrzymanie propagacji kliknięcia, aby nie wpłynęło na Accordion
                      saveFavourites();
                    }}
                    style={{
                      // position: "absolute", // Ustawienie absolutne, żeby przycisk nie wpływał na układ
                      right: "10%", // Przesunięcie przycisku na prawo
                      top: "50%", // Ustawienie przycisku na środku wysokości
                      color: "#00D1CD",
                    }}
                  >
                    <FavoriteBorderIcon />
                  </Button>
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
                            sortByPrice={sortByPrice}
                            setSortByPrice={setSortByPrice}
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
                                  setHourArrivalValue,
                                  sortByDepartureTime,
                                  setSortByDepartureTime,
                                  sortByArrivalTime,
                                  setSortByArrivalTime
                                )}
                                {RenderDepartureDays(
                                  selectedDays,
                                  handleChangeSelectedDays
                                )}
                                {RenderTimeSlider(
                                  tripTimeValue,
                                  setTripTimeValue,
                                  sortByTripTime,
                                  setSortByTripTime
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
                                  setHourArrivalReturnValue,
                                  sortByDepartureTimeReturn,
                                  setSortByDepartureTimeReturn,
                                  sortByArrivalTimeReturn,
                                  setSortByArrivalTimeReturn
                                )}
                                {RenderDepartureDays(
                                  selectedReturnDays,
                                  handleChangeSelectedReturnDays
                                )}
                                {RenderTimeSlider(
                                  tripTimeReturnValue,
                                  setTripTimeReturnValue,
                                  sortByTripTimeReturn,
                                  setSortByTripTimeReturn
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
                              setHourArrivalValue,
                              sortByDepartureTime,
                              setSortByDepartureTime,
                              sortByArrivalTime,
                              setSortByArrivalTime
                            )}
                            {RenderDepartureDays(
                              selectedDays,
                              handleChangeSelectedDays
                            )}
                            {RenderTimeSlider(
                              tripTimeValue,
                              setTripTimeValue,
                              sortByTripTime,
                              setSortByTripTime
                            )}
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
                    children={childrenCount}
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
      </Container>
      <Footer className="footer" />
    </div>
  );
}
