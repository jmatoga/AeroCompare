package jm.aerocompare.dto;

import jm.aerocompare.model.EClass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightDTO {
    private UUID id;
    private Integer flightNumber;
    private AirportDTO departureAirport;
    private AirportDTO arrivalAirport;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private AirlineDTO airline;
    private AirplaneDTO airplane;
    private Integer priceForAdult;
    private Integer priceForChild;
    private Integer priceForHandLuggage;
    private Integer priceForCheckedLuggage;
    private Integer distanceKm;
    private Integer seatsLeft;
    private String bookingLink;
    private EClass eClass;
    private List<RelationalFlightDTO> relationalFlights;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FlightDTO flightDTO = (FlightDTO) o;
        return id != null && id.equals(flightDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
