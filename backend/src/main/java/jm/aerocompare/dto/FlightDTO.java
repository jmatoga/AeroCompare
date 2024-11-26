package jm.aerocompare.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightDTO {
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
    private Integer durationHours;
    private Integer durationMinutes;
    private Integer seatsLeft;
}
