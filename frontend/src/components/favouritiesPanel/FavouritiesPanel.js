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
import FavouriteCard from "./FavouriteCard.js";
import Pagination from "@mui/material/Pagination";
import SplitButton from "./SplitButton.js";
import AeroCompareLogo from "../../resources/aero-compare-high-resolution-logo.png";
import AeroCompareLogo1 from "../../resources/aero.png";

export default function FavourititesPanel() {
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
                    <FavouriteCard
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
