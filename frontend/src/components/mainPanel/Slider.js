import React, { useState } from "react";
import { Slider, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import NorthIcon from "@mui/icons-material/North";

export function HourSlider({
  label,
  value,
  setValue,
  valuetext,
  minDistance = 1,
  sortByTime,
  setSortByTime,
}) {
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 24 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  function valueLabelFormat(value) {
    if (value < 10) return `0${value}:00`;
    else if (value < 24) return `${value}:00`;
    else return `23:59`;
  }

  return (
    <Box sx={{ width: 250 }} marginLeft={"20px"}>
      <Typography
        sx={{ width: 251 }}
        id="non-linear-slider"
        gutterBottom
        textAlign="center"
      >
        {`${label} `}
        {value[0] === 0 && value[1] === 24 ? (
          <b>all day</b>
        ) : (
          <>
            from <b>{valueLabelFormat(value[0])}</b> to{" "}
            <b>{valueLabelFormat(value[1])}</b>
          </>
        )}
        <Button
          sx={{
            width: 30,
            maxWidth: 30,
            minWidth: 30,
            padding: 0,
            margin: 0,
          }}
          onClick={() => setSortByTime(!sortByTime)}
        >
          <NorthIcon
            sx={{
              transform: sortByTime ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
          />
        </Button>
      </Typography>
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        disableSwap
        marks={[
          { label: "00:00", value: 0 },
          { label: "23:59", value: 24 },
        ]}
        step={1}
        min={0}
        max={24}
      />
    </Box>
  );
}

export function PriceSlider({
  value,
  setValue,
  valuetext,
  minDistance = 100,
  sortByPrice,
  setSortByPrice,
}) {
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 15000 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  function valueLabelFormat(value) {
    if (value < 15000) return `${value} PLN`;
    else return "Any";
  }

  return (
    <Box sx={{ width: 500 }} marginLeft={"20px"}>
      <Typography id="non-linear-slider" gutterBottom textAlign="center">
        {"Trip Price"}
        {value[0] === 0 && value[1] === 15000 ? (
          <>
            : <b>Any Price</b>
          </>
        ) : (
          <>
            {" "}
            <b>{valueLabelFormat(value[0])}</b> -{" "}
            <b>{valueLabelFormat(value[1])}</b>
          </>
        )}
        <Button
          sx={{
            width: 30,
            maxWidth: 30,
            minWidth: 30,
            padding: 0,
            margin: 0,
          }}
          onClick={() => setSortByPrice(!sortByPrice)}
        >
          <NorthIcon
            sx={{
              transform: sortByPrice ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
          />
        </Button>
      </Typography>
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        disableSwap
        marks={[
          { label: "0 PLN", value: 0 },
          { label: "Any", value: 15000 },
        ]}
        step={1}
        min={0}
        max={15000}
      />
    </Box>
  );
}

export function TripTimeSlider({
  label,
  value,
  setValue,
  sortByTripTime,
  setSortByTripTime,
}) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 250 }} marginLeft={"20px"}>
      <Typography id="linear-slider" gutterBottom textAlign="center">
        {`${label}`}
        {value < 60 ? (
          <>
            {" "}
            up to{" "}
            <b>
              {value} {value === 1 ? "hour" : "hours"}
            </b>
          </>
        ) : (
          <>
            : <b>Any time</b>
          </>
        )}
        <Button
          sx={{
            width: 30,
            maxWidth: 30,
            minWidth: 30,
            padding: 0,
            margin: 0,
          }}
          onClick={() => setSortByTripTime(!sortByTripTime)}
        >
          <NorthIcon
            sx={{
              transform: sortByTripTime ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
          />
        </Button>
      </Typography>
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        disableSwap
        defaultValue={60}
        marks={[
          { label: "up to 1 hour", value: 1 },
          { label: "Any", value: 60 },
        ]}
        step={1}
        min={1}
        max={60}
        sx={{
          "& .MuiSlider-markLabel[data-index='0']": {
            marginLeft: "18px",
          },
        }}
      />
    </Box>
  );
}
