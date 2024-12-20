package jm.aerocompare.dto;

import jm.aerocompare.model.EClass;
import jm.aerocompare.model.EStopNumber;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightFilterDTO {
    private int page = 0;
    private int size = 5;
    private List<Boolean> sortersList;
    private EStopNumber stopNumber = EStopNumber.ANY_NUMBER_OF_STOPS;
    private List<UUID> departureAirportIdList;
    private List<UUID> arrivalAirportIdList;
    private LocalDate departureDate;
    private List<UUID> airlinesIdList;
    private List<EClass> classesList;
    private Integer minPrice;
    private Integer maxPrice;
    private LocalTime departureTimeStart;
    private LocalTime departureTimeEnd;
    private LocalTime arrivalTimeStart;
    private LocalTime arrivalTimeEnd;
    private List<DayOfWeek> departureDays;
    private Integer tripTime;
    private Integer passengersCount = 0;
    private Integer childrenCount = 0;
    private Integer handLuggageCount = 0;
    private Integer baggageCount = 0;
}
