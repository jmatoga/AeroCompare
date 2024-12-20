// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Form,
//   Button,
//   ButtonGroup,
//   ListGroup,
//   Row,
//   Col,
//   InputGroup,
// } from "react-bootstrap";
// // import Select from "react-select";
// import { getRequest, getRequestWithParams } from "../axios_helper.js";
// import PassengersModal from "../mainPanel/PassengersModal.js";
// import MultiChoice from "../mainPanel/MultiChoice.js";
// import { BsFillPeopleFill, BsFillLuggageFill } from "react-icons/bs";
// import { FaCaretDown } from "react-icons/fa";
// import DatePicker from "../mainPanel/DatePicker.js";
// import backgroundImage from "../../resources/2.jpg";
// import Footer from "../footer/Footer.js";
// import {
//   Slider,
//   Box,
//   Typography,
//   Checkbox,
//   TextField,
//   Card,
//   CardActionArea,
//   CardContent,
//   ThemeProvider,
//   createTheme,
//   Chip,
// } from "@mui/material";
// import ButtonMaterial from "@mui/material/Button";
// import {
//   HourSlider,
//   PriceSlider,
//   TripTimeSlider,
// } from "../mainPanel/Slider.js";
// import CustomCheckbox from "../mainPanel/CustomCheckBox.js";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import AirportSelect from "../mainPanel/AirportSelect.js";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import FavouritesCard from "./FavouritesCard.js";
// import Pagination from "@mui/material/Pagination";
// import SplitButton from "../mainPanel/SplitButton.js";
// import AeroCompareLogo from "../../resources/aero-compare-high-resolution-logo.png";
// import AeroCompareLogo1 from "../../resources/aero.png";

// export default function FavourititesCard({ key, favourite }) {
//   const useFavurites = () => {
//     console.log("useFavurites");
//   };

//   return (
//     <div style={{ display: "flex", alignItems: "flex-start" }}>
//       {/* Main Trip Card */}
//       <Card
//         key={key}
//         sx={{
//           width: "80%",
//           height: "140px",
//           display: "flex",
//           alignItems: "center",
//           position: "relative",
//           border: "1px solid lightgray",
//           borderRadius: "10px",
//           overflow: "visible", // Upewnij się, że zawartość wychodząca nie jest obcinana
//         }}
//       >
//         <CardActionArea
//           onClick={useFavurites()}
//           sx={{
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <CardContent
//             sx={{
//               width: "100%",
//               height: "100%",
//             }}
//           >
//             <div className="row">
//               <div className="col-md-3 mt-2">
//                 <div className="col mt-3">
//                   <Typography
//                     variant="h5"
//                     component="div"
//                     sx={{ position: "absolute", top: 10 }}
//                   >
//                     fsafasfaf
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     component="div"
//                     sx={{
//                       position: "absolute",
//                       right: 15,
//                       top: 5,
//                       fontFamily:
//                         "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", // Ustawiamy font-family
//                       color: "gray",
//                     }}
//                   >
//                     {/* Wybieranie która klasa jest głównie albo pierwszy i tooltip  */}
//                     aaaa
//                   </Typography>
//                   <Chip
//                     variant="outlined"
//                     label={"fsafaf"}
//                     sx={{
//                       position: "relative",
//                       top: 12,
//                       fontSize: 29,
//                       borderWidth: 3,
//                       height: 50,
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-9 mt-2">
//                 <div className="col mt-3 text-center">
//                   <div className="row">
//                     {/* Flight Details */}
//                     <div className="col-md-3 mt-2">
//                       <div className="col mt-3">
//                         <Typography
//                           variant="h4"
//                           component="div"
//                           sx={{ position: "relative", top: -10 }}
//                         >
//                           eeee
//                         </Typography>
//                       </div>
//                     </div>

//                     <div className="col-md-2 mt-2">
//                       <div className="col mt-3 text-center">
//                         <Typography
//                           variant="h6"
//                           sx={{ position: "absolute", top: 40 }}
//                         >
//                           aaaa
//                         </Typography>
//                       </div>
//                     </div>

//                     <div className="col-md-2 mt-2 p-0">
//                       <div className="col mt-3 text-center">
//                         <Typography
//                           variant="h7"
//                           sx={{
//                             position: "relative",
//                             top: -30,
//                             fontWeight: "bold",
//                           }}
//                         >
//                           aaaa
//                         </Typography>
//                         <Chip
//                           variant="outlined"
//                           label={"assfa"}
//                           sx={{
//                             position: "relative",
//                             top: -30,
//                             fontSize: 22,
//                           }}
//                         />
//                       </div>
//                     </div>

//                     <div className="col-md-2 mt-2">
//                       <div className="col mt-3 text-center">
//                         <Typography
//                           variant="h6"
//                           sx={{
//                             position: "absolute",
//                             top: 40,
//                             right: 195,
//                           }}
//                         >
//                           wafasf
//                         </Typography>
//                       </div>
//                     </div>

//                     <div className="col-md-3 mt-2">
//                       <div className="col mt-3">
//                         <Typography
//                           variant="h4"
//                           component="div"
//                           sx={{ position: "relative", top: -10 }}
//                         >
//                           ddd
//                         </Typography>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     </div>
//   );
// }
import React from "react";
import {
  Card,
  Typography,
  Chip,
  CardContent,
  CardActionArea,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function HistoryCard({ favourite }) {
  return (
    <div style={{ padding: "10px 10px", width: "100%" }}>
      <Card
        sx={{
          width: "100%",
          borderRadius: "10px",
          border: "1px solid lightgray",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <CardActionArea>
          <CardContent
            sx={{ padding: "20px", display: "flex", flexDirection: "row" }}
          >
            {/* Airline and ID */}
            <div style={{ flex: 2, textAlign: "left" }}>
              <Typography variant="h6" color="textSecondary">
                Airline:
              </Typography>
              <Typography variant="h5">
                {favourite.airlinesIdList || "Any Airline"}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                {"Any number of stops"}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Hand Luggage: {favourite.handLuggageCount || 0}
                <br />
                Baggage: {favourite.baggageCount || 0}
              </Typography>
            </div>

            {/* Departure and Arrival */}
            <div style={{ flex: 5, textAlign: "center" }}>
              <Typography variant="h6" color="textSecondary">
                <b>02.12.24</b> Departure & Return <b>12.12.24</b>
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {"10:00 - 15:00 "} <b>{"BLL"}</b> → <b>{"NRT"}</b>
                {" 19:00 - Any "}
                {/* {favourite.departureAirportIdList || "Any"} →{" "}
                {favourite.arrivalAirportIdList || "Any"} */}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Departure Days:{" "}
                {favourite.departureDays
                  .map((d) => d.substring(0, 3))
                  .join(", ")}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Max Trip Time: 2h 30m | Economy
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                <DeleteIcon />
              </Typography>
            </div>

            {/* Price and Passengers */}
            <div style={{ flex: 2, textAlign: "right" }}>
              <Typography variant="h6" color="textSecondary">
                Price:
              </Typography>
              <Typography variant="h5">
                {favourite.minPrice ? `${favourite.minPrice} PLN` : "Any Price"}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Passengers: {favourite.passengersCount}
                <br />
                Children: {favourite.childrenCount || 0}
                <br />
                Infants: {favourite.infantsCount || 0}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
