import React from "react";
import Select from "react-select";
import Form from "react-bootstrap/Form";

export default function AirportSelect({
  label,
  airport,
  airportList,
  setAirportList,
  className = "col-md-3 mt-2",
  isMulti = true,
  required = true,
}) {
  const formatOptionLabel = (option, { context }) => {
    return context === "menu" ? (
      <>
        {option.value.iata_code} - {option.value.country},{" "}
        <b>{option.value.city}</b> ({option.value.name})
      </>
    ) : (
      option.value.city
    );
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
    }),
  };

  return (
    <div className={className}>
      <Form.Label
        style={{
          // color: "red",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", // Ustawiamy font-family
        }}
      >
        {label}
      </Form.Label>
      <Select
        id="airportSelect"
        name="airportSelect"
        options={airport.map((a) => ({
          value: a,
          label: `${a.iata_code} - ${a.country}, ${a.city} (${a.name})`,
        }))}
        formatOptionLabel={formatOptionLabel}
        onChange={(selectedOptions) => setAirportList(selectedOptions)}
        value={airportList.filter((option) =>
          airport.some((a) => a.id === option.value.id)
        )}
        placeholder={"Select your destination..."}
        isSearchable
        isClearable
        required={required}
        isMulti={isMulti}
        onInvalid={(e) => {
          if (required) e.target.setCustomValidity("Select your destination");
        }}
        onBlur={(e) => {
          e.target.setCustomValidity("");
        }}
        styles={customStyles}
      />
    </div>
  );
}
