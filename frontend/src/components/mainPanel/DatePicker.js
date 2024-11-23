import React, { useState, useEffect, useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function DatePicker({
  label,
  selectedDate,
  setSelectedDate,
  className = "col-md-3 mt-2",
  required = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null); // Ref to the calendar div
  const inputRef = useRef(null); // Ref to the input element

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false); // Close the calendar after selecting a date
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const monthCaptionStyle = {
    paddingLeft: "1rem",
  };

  return (
    <div className={className}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          ref={inputRef} // Attach ref to the input element
          type="text"
          value={selectedDate ? selectedDate.toLocaleDateString() : ""}
          onFocus={() => setIsOpen(true)}
          readOnly
          placeholder={"Select " + label.toLowerCase() + "..."}
        />
      </InputGroup>

      {isOpen && (
        <div
          ref={calendarRef} // Attach ref to the calendar div
          style={{
            position: "absolute",
            zIndex: 1000,
            backgroundColor: "white",
            border: "5px solid #ddd",
          }}
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            captionLayout="dropdown-months"
            weekStartsOn={1}
            required={required}
            endMonth={new Date(new Date().getFullYear() + 10, 11)}
            styles={{
              month_caption: monthCaptionStyle,
            }}
          />
        </div>
      )}
    </div>
  );
}
