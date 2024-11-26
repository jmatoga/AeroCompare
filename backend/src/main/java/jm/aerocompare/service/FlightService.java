package jm.aerocompare.service;

import jm.aerocompare.dto.FlightDTO;
import jm.aerocompare.model.EClass;
import org.springframework.data.domain.Page;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface FlightService {
    Page<FlightDTO> getAllFlights(int page, int size, List<UUID> airportIdDTOList, List<EClass> classesList, List<UUID> airlinesIdList, LocalDate departureDate,
                                  LocalDateTime departureTimeStart, LocalDateTime departureTimeEnd,
                                  LocalDateTime arrivalTimeStart, LocalDateTime arrivalTimeEnd,
                                  List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount);
}
