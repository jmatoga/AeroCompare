import React from "react";
import { ListGroup } from "react-bootstrap";

export default function ComparisonList({ displayedTickets }) {
  return (
    <ListGroup className="mb-4">
      {displayedTickets.length > 0 ? (
        displayedTickets.map((ticket, index) => (
          <ListGroup.Item key={index}>
            <strong>{ticket.destination}</strong> - {ticket.airline} -{" "}
            {ticket.price} PLN
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>Brak wyników dla podanych filtrów</ListGroup.Item>
      )}
    </ListGroup>
  );
}
