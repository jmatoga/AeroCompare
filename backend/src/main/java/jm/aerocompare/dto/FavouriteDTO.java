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
public class FavouriteDTO {
    private UUID id;
    private List<Boolean> sortersList;
    private EStopNumber stopNumber;
    private List<UUID> departureAirportIdList;
    private List<UUID> arrivalAirportIdList;
    private LocalDate departureDate;
    private LocalDate ArrivalDate;
    private List<UUID> airlinesIdList;
    private List<EClass> classesList;
    private List<DayOfWeek> departureDays;
    private Integer minPrice;
    private Integer maxPrice;
    private LocalTime departureTimeStart;
    private LocalTime departureTimeEnd;
    private LocalTime arrivalTimeStart;
    private LocalTime arrivalTimeEnd;
    private Integer tripTime;
    private Integer passengersCount;
    private Integer childrenCount;
    private Integer infantsCount;
    private Integer handLuggageCount;
    private Integer baggageCount;
    private UUID userId;
}
