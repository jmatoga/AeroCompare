package jm.aerocompare.service;

import jm.aerocompare.dto.FlightDTO;
import jm.aerocompare.model.EClass;
import org.springframework.data.domain.Page;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface FlightService {
    Page<FlightDTO> getDirectFlights(int page, int size, List<Boolean> sortersList, List<UUID> departureAirportIdList, List<UUID> arrivalAirportIdList, LocalDate departureDate, List<EClass> classesList, List<UUID> airlinesIdList, Integer minPrice, Integer maxPrice, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer handLuggageCount, Integer baggageCount);

    Page<FlightDTO> getDirectAndUpTo1Flights(int page, int size, List<Boolean> sortersList, List<UUID> departureAirportIdList, List<UUID> arrivalAirportIdList, LocalDate departureDate, List<EClass> classesList, List<UUID> airlinesIdList, Integer minPrice, Integer maxPrice, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer handLuggageCount, Integer baggageCount);
}
