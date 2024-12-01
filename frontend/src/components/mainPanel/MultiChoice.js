import React, { useState } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

export default function MultiChoice({
  label,
  entities,
  entitiesList,
  setEntitesList,
  isMulti = true,
  defaultValue,
}) {
  const [placeholder] = useState("Select your " + label.toLowerCase());
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Select
        options={entities
          .filter(
            (entity) =>
              // Filtruj, aby usunąć elementy, które są już w entitiesList
              !entitiesList.some((selected) => selected.key === entity.id)
          )
          .map((entity) => ({
            label: entity.name
              .replaceAll("_", " ")
              .toLowerCase()
              .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()), // Kapitalizacja pierwszej litery lub pierwszej po spacji,
            value: entity,
            key: entity.id,
          }))}
        value={entitiesList.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.key === value.key)
        )}
        placeholder={placeholder + "..."}
        onChange={(selectedOptions) => setEntitesList(selectedOptions)}
        isSearchable
        isClearable
        required
        isMulti={isMulti}
        defaultValue={[entities[0]]}
        onInvalid={(e) => {
          e.target.setCustomValidity(`${placeholder}`);
        }}
        onBlur={(e) => {
          e.target.setCustomValidity("");
        }}
        styles={{
          control: (provided) => ({
            ...provided,
            textAlign: "left",
          }),
          valueContainer: (provided) => ({
            ...provided,
            maxHeight: "200px",
            overflowY: "auto",
          }),
        }}
      />
    </Form.Group>
  );
}
