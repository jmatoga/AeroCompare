import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function FilterComponent({ onFilterChange }) {
  const [filters, setFilters] = useState({
    destination: "",
    airline: "",
    maxPrice: 1000,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Ustal liczbę elementów na stronę

  //   const handleApplyFilters = () => {
  //     onFilterChange({ destination, airline, priceRange });
  //   };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name === "maxPrice" ? Number(value) : value,
    }));
  };

  return (
    <Form className="mb-4">
      <Form.Group>
        <Form.Label>Destynacja</Form.Label>
        <Form.Control
          type="text"
          name="destination"
          value={filters.destination}
          onChange={handleFilterChange}
          placeholder="Wpisz destynację"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Linia lotnicza</Form.Label>
        <Form.Control
          type="text"
          name="airline"
          value={filters.airline}
          onChange={handleFilterChange}
          placeholder="Wpisz linię lotniczą"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Maksymalna cena</Form.Label>
        <Form.Control
          type="range"
          name="maxPrice"
          min="0"
          max="1500"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <div>Obecna cena: {filters.maxPrice} PLN</div>
      </Form.Group>
      <Button variant="primary" onClick={() => setCurrentPage(1)}>
        Zastosuj filtry
      </Button>
    </Form>
  );
}

export default FilterComponent;
