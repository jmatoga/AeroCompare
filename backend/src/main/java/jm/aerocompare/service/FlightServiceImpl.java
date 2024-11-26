package jm.aerocompare.service;

import jm.aerocompare.dto.FlightDTO;
import jm.aerocompare.mapper.FlightMapper;
import jm.aerocompare.model.EClass;
import jm.aerocompare.model.Flight;
import jm.aerocompare.repository.FlightRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FlightServiceImpl implements FlightService {
    private final FlightRepository flightRepository;
    private final FlightMapper flightMapper;
    private final AirlineService airlineService;


    @Override
    public Page<FlightDTO> getAllFlights(int page, int size, List<UUID> airportIdDTOList, List<EClass> classesList, List<UUID> airlinesIdList, LocalDate departureDate,
                                         LocalDateTime departureTimeStart, LocalDateTime departureTimeEnd,
                                         LocalDateTime arrivalTimeStart, LocalDateTime arrivalTimeEnd,
                                         List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Flight> flightsPage = flightRepository.findFlightBySimpleFilters(pageable, airportIdDTOList, airlinesIdList, classesList, passengersCount);
        // Too complicated to use in SQL query
        List<FlightDTO> processedContent = flightsPage.getContent().stream()
//                                                   .filter(flight -> airportIdDTOList == null || airportIdDTOList.contains(flight.getAirplane().getAirline().getId()))
                                                   .filter(flight -> departureDate == null || LocalDate.from(flight.getDepartureTime()).equals(departureDate))
                                                   .filter(flight -> departureDays == null || departureDays.contains(flight.getDepartureTime().getDayOfWeek()))
                                                   .filter(flight -> tripTime == null
                                                                             || (flight.getDurationMinutes() > 0 ? flight.getDurationHours() + 1 <= tripTime
                                                                                         : flight.getDurationHours() <= tripTime))
                                                   .filter(flight -> departureTimeStart == null || flight.getDepartureTime().isAfter(departureTimeStart))
                                                   .filter(flight -> departureTimeEnd == null || flight.getDepartureTime().isBefore(departureTimeEnd))
                                                   .filter(flight -> arrivalTimeStart == null || flight.getArrivalTime().isAfter(arrivalTimeStart))
                                                   .filter(flight -> arrivalTimeEnd == null || flight.getArrivalTime().isBefore(arrivalTimeEnd))
                                                   .filter(flight -> passengersCount == null || flight.getSeatsLeft() >= passengersCount)
                                                   .map(flightMapper::mapToFlightDTO)
                                                   .toList();

        // Konwersja przetworzonych danych z powrotem na Page<T>
        return new PageImpl<>(processedContent, pageable, flightsPage.getTotalElements());

//        return flightMapper.mapToFlightDTOPage(
//                flightRepository.findFlightBySimpleFilters(pageable, airportIdDTOList,
//                        classesList));
    }
}
