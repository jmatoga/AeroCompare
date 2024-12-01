import React from "react";
import { Modal } from "react-bootstrap";
import { IoPerson } from "react-icons/io5";
import { TbMoodKidFilled } from "react-icons/tb";
import { FaBaby, FaLuggageCart } from "react-icons/fa";
import { MdLuggage } from "react-icons/md";
import { Button, ButtonGroup } from "@mui/material";

export default function PassengersModal({
  show,
  onHide,
  passengersCount,
  setPassengersCount,
  childrenCount,
  setChildrenCount,
  infantsCount,
  setInfantsCount,
  handLuggageCount,
  setHandLuggageCount,
  baggageCount,
  setBaggageCount,
}) {
  const incrementPassenger = (setCount) => {
    if (passengersCount + childrenCount + infantsCount < 9) {
      setCount((prev) => prev + 1);
    }
  };
  const incrementHandLuggage = (setCount, count) => {
    if (count < passengersCount + childrenCount) {
      setCount((prev) => prev + 1);
    }
  };
  const incrementBaggage = (setCount, count) => {
    if (count < (passengersCount + childrenCount) * 2) {
      setCount((prev) => prev + 1);
    }
  };

  const decrementPassenger = (setCount, count) => {
    if (count > 0) {
      setCount((prev) => prev - 1);

      if (handLuggageCount > passengersCount + childrenCount - 1) {
        setHandLuggageCount((prev) => prev - 1);
      }
      if (baggageCount >= (passengersCount + childrenCount) * 2 - 1) {
        setBaggageCount((prev) => prev - 1);
        if (baggageCount - 1 >= (passengersCount + childrenCount) * 2 - 1) {
          setBaggageCount((prev) => prev - 1);
        }
      }
    }
  };
  const decrementBaggageOrInfants = (setCount, count) => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <h4 className="text-center">Passengers:</h4>

        {/* Passengers Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">
            <IoPerson
              style={{
                color: "#00D1CD",
              }}
            />{" "}
            <b>Adults</b> (above 11):{" "}
          </p>
          <ButtonGroup>
            <Button
              variant="contained"
              disabled={passengersCount <= 0}
              onClick={() =>
                decrementPassenger(setPassengersCount, passengersCount)
              }
              style={{
                backgroundColor: passengersCount > 0 ? "#00D1CD" : "grey",
                color: "#fff", // Dodanie kontrastowego koloru tekstu
              }}
            >
              -
            </Button>
            <Button
              variant="light"
              disabled
              style={{
                color: "gray",
              }}
            >
              <strong>{passengersCount}</strong>
            </Button>
            <Button
              style={{
                backgroundColor: passengersCount < 9 ? "#00D1CD" : "grey",
                color: "#fff", // Dodanie kontrastowego koloru tekstu
              }}
              disabled={passengersCount >= 9}
              onClick={() => incrementPassenger(setPassengersCount)}
            >
              +
            </Button>
          </ButtonGroup>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">
            <TbMoodKidFilled
              style={{
                color: "#00D1CD",
              }}
            />{" "}
            <b>Children</b> (2 - 11):{" "}
          </p>
          <ButtonGroup>
            <Button
              style={{
                backgroundColor: childrenCount > 0 ? "#00D1CD" : "grey",
                color: "#fff", // Dodanie kontrastowego koloru tekstu
              }}
              disabled={childrenCount <= 0}
              onClick={() =>
                decrementPassenger(setChildrenCount, childrenCount)
              }
            >
              -
            </Button>
            <Button
              variant="light"
              disabled
              style={{
                color: "gray",
              }}
            >
              <strong>{childrenCount}</strong>
            </Button>
            <Button
              style={{
                backgroundColor: childrenCount < 9 ? "#00D1CD" : "grey",
                color: "#fff", // Dodanie kontrastowego koloru tekstu
              }}
              disabled={childrenCount >= 9}
              onClick={() => incrementPassenger(setChildrenCount)}
            >
              +
            </Button>
          </ButtonGroup>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">
            <FaBaby
              style={{
                color: "#00D1CD",
              }}
            />{" "}
            <b>Infants</b> (under 2):{" "}
          </p>
          <ButtonGroup>
            <Button
              style={{
                backgroundColor: infantsCount > 0 ? "#00D1CD" : "grey",
                color: "#fff", // Dodanie kontrastowego koloru tekstu
              }}
              disabled={infantsCount <= 0}
              onClick={() =>
                decrementBaggageOrInfants(setInfantsCount, infantsCount)
              }
            >
              -
            </Button>
            <Button
              variant="light"
              disabled
              style={{
                color: "gray",
              }}
            >
              <strong>{infantsCount}</strong>
            </Button>
            <Button
              style={{
                backgroundColor: infantsCount < 9 ? "#00D1CD" : "grey",
                color: "#fff", // Dodanie kontrastowego koloru tekstu
              }}
              disabled={infantsCount >= 9}
              onClick={() => incrementPassenger(setInfantsCount)}
            >
              +
            </Button>
          </ButtonGroup>
        </div>

        {/* Baggage Section */}
        <h4 className="text-center">Baggage:</h4>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">
            <MdLuggage
              style={{
                color: "#00D1CD",
              }}
            />{" "}
            <b>Hand Luggage</b>
          </p>
          <ButtonGroup>
            <Button
              style={{
                backgroundColor: handLuggageCount > 0 ? "#00D1CD" : "grey",
                color: "#fff", // Dodanie kontrastowego koloru tekstu
              }}
              disabled={handLuggageCount <= 0}
              onClick={() =>
                decrementBaggageOrInfants(setHandLuggageCount, handLuggageCount)
              }
            >
              -
            </Button>
            <Button
              variant="light"
              disabled
              style={{
                color: "gray",
              }}
            >
              <strong>{handLuggageCount}</strong>
            </Button>
            <Button
              style={{
                backgroundColor:
                  handLuggageCount < passengersCount + childrenCount
                    ? "#00D1CD"
                    : "grey",
                color: "#fff", // Dodanie kontrastowego koloru tekstu
              }}
              disabled={handLuggageCount >= passengersCount + childrenCount}
              onClick={() =>
                incrementHandLuggage(setHandLuggageCount, handLuggageCount)
              }
            >
              +
            </Button>
          </ButtonGroup>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">
            <FaLuggageCart
              style={{
                color: "#00D1CD",
              }}
            />{" "}
            <b>Baggage</b>
          </p>
          <ButtonGroup>
            <Button
              style={{
                backgroundColor: baggageCount > 0 ? "#00D1CD" : "grey",
                color: "#fff", // Dodanie kontrastowego koloru tekstu
              }}
              disabled={baggageCount <= 0}
              onClick={() =>
                decrementBaggageOrInfants(setBaggageCount, baggageCount)
              }
            >
              -
            </Button>
            <Button
              variant="light"
              disabled
              style={{
                color: "gray",
              }}
            >
              <strong>{baggageCount}</strong>
            </Button>
            <Button
              style={{
                backgroundColor:
                  baggageCount < (passengersCount + childrenCount) * 2
                    ? "#00D1CD"
                    : "grey",
                color: "#fff", // Dodanie kontrastowego koloru tekstu
              }}
              disabled={baggageCount >= (passengersCount + childrenCount) * 2}
              onClick={() => incrementBaggage(setBaggageCount, baggageCount)}
            >
              +
            </Button>
          </ButtonGroup>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button color="success" variant="contained" onClick={onHide}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
