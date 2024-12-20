import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { getRequest } from "../axios_helper";
import { se } from "date-fns/locale";
import "../../resources/Bebas-Neue.ttf";

export default function SplitButton({ setStops }) {
  const [open, setOpen] = React.useState(false);
  const [stopsList, setStopsList] = useState([]);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    fetchStopsList();
  }, []);

  const fetchStopsList = async () => {
    try {
      const [stopNumbersReponse] = await Promise.all([
        getRequest("api/stopNumbers"),
      ]);

      setStopsList(
        stopNumbersReponse.data.map((stop) => stop.replaceAll("_", " "))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setStops(stopsList[index]);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        style={{
          borderRadius: "7px", // Zaokrąglenie dla całej grupy
        }}
      >
        {/* Przyciski z tekstem */}
        <Button
          onClick={handleToggle}
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "16px", // Ustawiamy wielkość czcionki
            fontFamily:
              "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", // Ustawiamy font-family
            borderTopLeftRadius: "7px", // Zaokrąglenie tylko lewego górnego rogu
            borderBottomLeftRadius: "7px", // Zaokrąglenie tylko lewego dolnego rogu
            backgroundColor: "#00D1CD", // Kolor tła
          }}
        >
          {stopsList && stopsList[selectedIndex]}{" "}
        </Button>

        {/* Przycisk rozwijany */}
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{
            fontSize: "16px", // Ustawiamy wielkość czcionki
            fontFamily:
              "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", // Ustawiamy font-family
            borderTopRightRadius: "7px", // Zaokrąglenie tylko prawego górnego rogu
            borderBottomRightRadius: "7px", // Zaokrąglenie tylko prawego dolnego rogu
            backgroundColor: "#00D1CD", // Kolor tła
            border: `2px solid #00D1CD`, // Obramowanie w tym samym kolorze
          }}
        >
          <ArrowDropDownIcon sx={{ color: "white" }} />
        </Button>
      </ButtonGroup>
      {/* Popper (menu rozwijane) */}
      <Popper
        sx={{ zIndex: 1 }} // Zaokrąglenie dla całego menu
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {stopsList.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
