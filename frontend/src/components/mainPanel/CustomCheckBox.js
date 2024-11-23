import React from "react";
import { Checkbox, Typography } from "@mui/material";

export default function CustomCheckbox({ label, checked, handleChange }) {
  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      icon={
        <Typography
          variant="body1"
          style={{
            fontWeight: checked ? "bold" : "normal",
            color: "black",
          }}
        >
          {label}
        </Typography>
      }
      checkedIcon={
        <Typography
          variant="body1"
          style={{ fontWeight: "bold", color: "white" }}
        >
          {label}
        </Typography>
      }
      inputProps={{
        "aria-label": "Custom checkbox",
      }}
      sx={{
        border: "2px solid", // outline
        borderColor: checked ? "primary.main" : "gray", // change outline color based on checked state
        borderRadius: "40%",
        padding: "4px",
        margin: "0 1px",
        "&:hover": {
          backgroundColor: checked ? "primary.light" : "rgba(0, 0, 0, 0.08)", // background change on hover
        },
        "&.Mui-checked": {
          backgroundColor: "primary.main", // background color when checked
        },
      }}
    />
  );
}
