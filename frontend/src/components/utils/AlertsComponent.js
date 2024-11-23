import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function AlertsComponent({
  message,
  severity = "success",
  visible,
  onClose,
}) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose(); // Wywołaj funkcję zamykającą po 3 sekundach
      }, 3000);

      return () => clearTimeout(timer); // Wyczyść timer po odmontowaniu komponentu
    }
  }, [visible, onClose]);

  if (!visible) return null; // Nie renderuj alertu, jeśli nie jest widoczny

  return (
    <Alert
      // icon={severnity === "success" ? <CheckIcon fontSize="inherit" /> : }
      severity={severity}
      variant="filled"
      sx={{
        position: "fixed",
        top: "30%",
        left: "50%", // Ustala pozycję od lewej krawędzi na 50% szerokości ekranu
        transform: "translateX(-50%)", // Przesuwa element w lewo o połowę jego szerokości, aby go wyśrodkować
        zIndex: 9999,
        display: "flex",
        boxShadow: 3,
      }}
    >
      {message}
    </Alert>
  );
}
