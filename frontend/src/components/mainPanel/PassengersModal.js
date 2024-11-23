import React from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import { IoPerson } from "react-icons/io5";
import { TbMoodKidFilled } from "react-icons/tb";
import { FaBaby, FaLuggageCart } from "react-icons/fa";
import { MdLuggage } from "react-icons/md";

export default function PassengersModal({
  show,
  onHide,
  passengersCount,
  setPassengersCount,
  childrensCount,
  setChildrensCount,
  infantsCount,
  setInfantsCount,
  handLuggageCount,
  setHandLuggageCount,
  baggageCount,
  setBaggageCount,
}) {
  const incrementPassenger = (setCount) => {
    if (passengersCount + childrensCount + infantsCount < 9) {
      setCount((prev) => prev + 1);
    }
  };
  const incrementHandLuggage = (setCount, count) => {
    if (count < passengersCount + childrensCount) {
      setCount((prev) => prev + 1);
    }
  };
  const incrementBaggage = (setCount, count) => {
    if (count < (passengersCount + childrensCount) * 2) {
      setCount((prev) => prev + 1);
    }
  };

  const decrementPassenger = (setCount, count) => {
    if (count > 0) {
      setCount((prev) => prev - 1);

      if (handLuggageCount > passengersCount + childrensCount - 1) {
        setHandLuggageCount((prev) => prev - 1);
      }
      if (baggageCount >= (passengersCount + childrensCount) * 2 - 1) {
        setBaggageCount((prev) => prev - 1);
        if (baggageCount - 1 >= (passengersCount + childrensCount) * 2 - 1) {
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
            <IoPerson /> <b>Adults</b> (above 11):{" "}
          </p>
          <ButtonGroup>
            <Button
              variant={passengersCount > 0 ? "secondary" : "light"}
              disabled={passengersCount <= 0}
              onClick={() =>
                decrementPassenger(setPassengersCount, passengersCount)
              }
            >
              -
            </Button>
            <Button variant="light" disabled>
              <strong>{passengersCount}</strong>
            </Button>
            <Button
              variant={passengersCount < 9 ? "secondary" : "light"}
              disabled={passengersCount >= 9}
              onClick={() => incrementPassenger(setPassengersCount)}
            >
              +
            </Button>
          </ButtonGroup>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">
            <TbMoodKidFilled /> <b>Childrens</b> (2 - 11):{" "}
          </p>
          <ButtonGroup>
            <Button
              variant={childrensCount > 0 ? "secondary" : "light"}
              disabled={childrensCount <= 0}
              onClick={() =>
                decrementPassenger(setChildrensCount, childrensCount)
              }
            >
              -
            </Button>
            <Button variant="light" disabled>
              <strong>{childrensCount}</strong>
            </Button>
            <Button
              variant={childrensCount < 9 ? "secondary" : "light"}
              disabled={childrensCount >= 9}
              onClick={() => incrementPassenger(setChildrensCount)}
            >
              +
            </Button>
          </ButtonGroup>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">
            <FaBaby /> <b>Infants</b> (under 2):{" "}
          </p>
          <ButtonGroup>
            <Button
              variant={infantsCount > 0 ? "secondary" : "light"}
              disabled={infantsCount <= 0}
              onClick={() =>
                decrementBaggageOrInfants(setInfantsCount, infantsCount)
              }
            >
              -
            </Button>
            <Button variant="light" disabled>
              <strong>{infantsCount}</strong>
            </Button>
            <Button
              variant={infantsCount < 9 ? "secondary" : "light"}
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
            <MdLuggage /> <b>Hand Luggage</b>
          </p>
          <ButtonGroup>
            <Button
              variant={handLuggageCount > 0 ? "secondary" : "light"}
              disabled={handLuggageCount <= 0}
              onClick={() =>
                decrementBaggageOrInfants(setHandLuggageCount, handLuggageCount)
              }
            >
              -
            </Button>
            <Button variant="light" disabled>
              <strong>{handLuggageCount}</strong>
            </Button>
            <Button
              variant={handLuggageCount < 9 ? "secondary" : "light"}
              disabled={handLuggageCount >= 9}
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
            <FaLuggageCart /> <b>Baggage</b>
          </p>
          <ButtonGroup>
            <Button
              variant={baggageCount > 0 ? "secondary" : "light"}
              disabled={baggageCount <= 0}
              onClick={() =>
                decrementBaggageOrInfants(setBaggageCount, baggageCount)
              }
            >
              -
            </Button>
            <Button variant="light" disabled>
              <strong>{baggageCount}</strong>
            </Button>
            <Button
              variant={baggageCount < 9 ? "secondary" : "light"}
              disabled={baggageCount >= 9}
              onClick={() => incrementBaggage(setBaggageCount, baggageCount)}
            >
              +
            </Button>
          </ButtonGroup>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
