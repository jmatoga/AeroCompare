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
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class FlightServiceImpl implements FlightService {
    private final FlightRepository flightRepository;
    private final FlightMapper flightMapper;

    @Override
    public Page<FlightDTO> getDirectFlights(int page, int size, List<Boolean> sortersList, List<UUID> departureAirportIdList, List<UUID> arrivalAirportIdList, LocalDate departureDate, List<EClass> classesList, List<UUID> airlinesIdList, Integer minPrice, Integer maxPrice, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer handLuggageCount, Integer baggageCount) {
        List<Flight> directFlightsWithSimpleFilters = flightRepository.findFlightBySimpleFilters(departureAirportIdList, arrivalAirportIdList, classesList,
                airlinesIdList, minPrice, maxPrice, passengersCount, childrenCount, handLuggageCount, baggageCount);

        // Too complicated to use in SQL query
        List<Flight> sortedFlights = filterListOfFlights(directFlightsWithSimpleFilters, sortersList, departureDate, departureTimeStart, departureTimeEnd, arrivalTimeStart, arrivalTimeEnd, departureDays, tripTime, passengersCount, childrenCount, handLuggageCount, baggageCount);

        List<FlightDTO> content = getContentFlights(page, size, sortedFlights);

        return new PageImpl<>(content, PageRequest.of(page, size), sortedFlights.size());
    }

    @Override
    public Page<FlightDTO> getDirectAndUpTo1Flights(int page, int size, List<Boolean> sortersList, List<UUID> departureAirportIdList, List<UUID> arrivalAirportIdList, LocalDate departureDate, List<EClass> classesList, List<UUID> airlinesIdList, Integer minPrice, Integer maxPrice, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer handLuggageCount, Integer baggageCount) {
        List<Flight> directFlightsContent = getDirectFlightsContent(departureAirportIdList, arrivalAirportIdList, classesList, airlinesIdList, minPrice, maxPrice, sortersList,
                departureDate, departureTimeStart, departureTimeEnd, arrivalTimeStart, arrivalTimeEnd, departureDays, tripTime, passengersCount, childrenCount, handLuggageCount, baggageCount);

        List<FlightDTO> directFlightsContentMapped = directFlightsContent.stream()
                                                             .map(flight -> flightMapper.mapToFlightDTO(flight, new ArrayList<>()))
                                                             .toList();

        List<FlightDTO> upTo1FlightsContent = getUpTo1StopFlightsContent(sortersList, departureAirportIdList, arrivalAirportIdList, departureDate, classesList, airlinesIdList, minPrice, maxPrice, departureTimeStart, departureTimeEnd, arrivalTimeStart, arrivalTimeEnd, departureDays, tripTime, passengersCount, childrenCount, handLuggageCount, baggageCount);
        // TODO REFACTOR
        List<FlightDTO> allFlights = Stream.concat(directFlightsContentMapped.stream(), upTo1FlightsContent.stream())
                                             .distinct()
                                             .toList();

        return new PageImpl<>(getContentRelationalFlights(page, size, upTo1FlightsContent), PageRequest.of(page, size), upTo1FlightsContent.size());
    }

    private List<FlightDTO> getUpTo1StopFlightsContent(List<Boolean> sortersList, List<UUID> departureAirportIdList, List<UUID> arrivalAirportIdList, LocalDate departureDate, List<EClass> classesList, List<UUID> airlinesIdList, Integer minPrice, Integer maxPrice, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer handLuggageCount, Integer baggageCount) {
        List<Flight> flightsFrom1StopWithSimpleFilters = flightRepository.flightsFrom1StopWithSimpleFilters(departureAirportIdList, classesList, airlinesIdList, passengersCount, childrenCount);
        List<FlightDTO> flightsFrom1StopFiltered = new ArrayList<>();

        flightsFrom1StopWithSimpleFilters.forEach(flight -> {
            if (arrivalAirportIdList.contains(flight.getArrivalAirport().getId())) {
                flightsFrom1StopFiltered.add(flightMapper.mapToFlightDTO(flight, new ArrayList<>()));
                return;
            }
            List<Flight> flightsTo1Stop = flightRepository.flightsTo1StopWithSimpleFilters(departureAirportIdList, arrivalAirportIdList, classesList, airlinesIdList, passengersCount, childrenCount)
                                                  .stream()
                                                  .filter(flightTo -> flightTo.getDepartureTime().isAfter(flight.getArrivalTime().plusHours(1))
                                                                              && flightTo.getDepartureTime().isBefore(flight.getArrivalTime().plusDays(1)))
                                                  .toList();
            flightsFrom1StopFiltered.add(flightMapper.mapToFlightDTO(flight, flightsTo1Stop));
        });

        return filterListOfRelationalFlights(flightsFrom1StopFiltered, sortersList, departureDate, minPrice, maxPrice, departureTimeStart, departureTimeEnd, arrivalTimeStart, arrivalTimeEnd, departureDays, tripTime, passengersCount, childrenCount, handLuggageCount, baggageCount);
    }

    private List<Flight> getDirectFlightsContent(List<UUID> departureAirportIdList, List<UUID> arrivalAirportIdList, List<EClass> classesList, List<UUID> airlinesIdList, Integer minPrice, Integer maxPrice, List<Boolean> sortersList,
                                                 LocalDate departureDate, LocalTime departureTimeStart, LocalTime departureTimeEnd,
                                                 LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays,
                                                 Integer tripTime, Integer passengersCount, Integer childrenCount, Integer handLuggageCount, Integer baggageCount) {
        List<Flight> directFlightsWithSimpleFilters = flightRepository.findFlightBySimpleFilters(departureAirportIdList, arrivalAirportIdList, classesList,
                airlinesIdList, minPrice, maxPrice, passengersCount, childrenCount, handLuggageCount, baggageCount);

        // Too complicated to use in SQL query
        return filterListOfFlights(directFlightsWithSimpleFilters, sortersList, departureDate, departureTimeStart, departureTimeEnd, arrivalTimeStart, arrivalTimeEnd, departureDays, tripTime, passengersCount, childrenCount, handLuggageCount, baggageCount);
    }

    private List<FlightDTO> getContentFlights(int page, int size, List<Flight> sortedFlights) {
        int start = Math.min(page * size, sortedFlights.size());
        int end = Math.min((page + 1) * size, sortedFlights.size());
        return sortedFlights.subList(start, end)
                       .stream()
                       .map(flightMapper::mapToFlightDTO)
                       .toList();
    }

    private List<FlightDTO> getContentRelationalFlights(int page, int size, List<FlightDTO> sortedFlights) {
        int start = Math.min(page * size, sortedFlights.size());
        int end = Math.min((page + 1) * size, sortedFlights.size());
        return sortedFlights.subList(start, end);
    }

    private static List<Flight> filterListOfFlights(List<Flight> flightsWithSimpleFilters, List<Boolean> sortersList, LocalDate departureDate, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer handLuggageCount, Integer baggageCount) {
        return flightsWithSimpleFilters.stream()
                       .filter(flight -> departureDate == null || LocalDate.from(flight.getDepartureTime()).equals(departureDate))
                       .filter(flight -> departureDays == null || departureDays.contains(flight.getDepartureTime().getDayOfWeek()))
                       .filter(flight -> tripTime == null || Duration.between(flight.getDepartureTime(), flight.getArrivalTime()).toMinutes() <= tripTime * 60)
                       .filter(flight -> departureTimeStart == null || LocalTime.from(flight.getDepartureTime()).isAfter(departureTimeStart.minusNanos(1)))
                       .filter(flight -> departureTimeEnd == null || LocalTime.from(flight.getDepartureTime()).isBefore(departureTimeEnd.plusNanos(1)))
                       .filter(flight -> arrivalTimeStart == null || LocalTime.from(flight.getArrivalTime()).isAfter(arrivalTimeStart.minusNanos(1)))
                       .filter(flight -> arrivalTimeEnd == null || LocalTime.from(flight.getArrivalTime()).isBefore(arrivalTimeEnd.plusNanos(1)))
                       .filter(flight -> passengersCount == null || flight.getSeatsLeft() >= passengersCount)
                       .sorted(getFlightComparator(sortersList, passengersCount, childrenCount, handLuggageCount, baggageCount))
                       .toList();
    }

    public static Comparator<Flight> getFlightComparator(List<Boolean> sortersList, Integer passengersCount, Integer childrenCount,
                                                         Integer handLuggageCount, Integer baggageCount) {
        List<Comparator<Flight>> comparators = List.of(
                Comparator.comparing(flight -> flight.getPriceForAdult() * passengersCount + flight.getPriceForChild() * childrenCount
                                                       + flight.getPriceForHandLuggage() * handLuggageCount + flight.getPriceForCheckedLuggage() * baggageCount),
                Comparator.comparing(flight -> Duration.between(flight.getDepartureTime(), flight.getArrivalTime())),
                Comparator.comparing(flight -> LocalTime.from(flight.getDepartureTime())),
                Comparator.comparing(flight -> LocalTime.from(flight.getArrivalTime()))
        );

        Comparator<Flight> combinedComparator = (flight1, flight2) -> 0;

        for (int i = 0; i < comparators.size(); i++) {
            if (sortersList.get(i)) {
                // aescending comparing
                combinedComparator = combinedComparator.thenComparing(comparators.get(i));
            } else {
                // descending comparing
                combinedComparator = combinedComparator.thenComparing(comparators.get(i).reversed());
            }
        }

        return combinedComparator;
    }

    private static List<FlightDTO> filterListOfRelationalFlights(List<FlightDTO> flightsWithSimpleFilters, List<Boolean> sortersList, LocalDate departureDate, Integer minPrice, Integer maxPrice, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer handLuggageCount, Integer baggageCount) {
        return flightsWithSimpleFilters.stream()
                       .filter(flight -> departureDate == null || LocalDate.from(flight.getDepartureTime()).equals(departureDate))
                       .filter(flight -> minPrice == null || flight.getPriceForAdult() * passengersCount + flight.getPriceForChild() * childrenCount
                                                                     + flight.getPriceForHandLuggage() * handLuggageCount + flight.getPriceForCheckedLuggage() * baggageCount
                                                                     + flight.getRelationalFlights().stream()
                                                                               .mapToInt(f -> f.getPriceForAdult() * passengersCount + f.getPriceForChild() * childrenCount + f.getPriceForHandLuggage() * handLuggageCount + f.getPriceForCheckedLuggage() * baggageCount)
                                                                               .sum()
                                                                     >= minPrice)
                       .filter(flight -> maxPrice == null || flight.getPriceForAdult() * passengersCount + flight.getPriceForChild() * childrenCount
                                                                     + flight.getPriceForHandLuggage() * handLuggageCount + flight.getPriceForCheckedLuggage() * baggageCount
                                                                     + flight.getRelationalFlights().stream()
                                                                               .mapToInt(f -> f.getPriceForAdult() * passengersCount + f.getPriceForChild() * childrenCount + f.getPriceForHandLuggage() * handLuggageCount + f.getPriceForCheckedLuggage() * baggageCount)
                                                                               .sum()
                                                                     <= maxPrice)
                       .filter(flight -> departureDays == null || departureDays.contains(flight.getDepartureTime().getDayOfWeek()))
                       .filter(flight -> tripTime == null || Duration.between(flight.getDepartureTime(), flight.getRelationalFlights().getLast().getArrivalTime()).toMinutes() <= tripTime * 60)
                       .filter(flight -> departureTimeStart == null || LocalTime.from(flight.getDepartureTime()).isAfter(departureTimeStart.minusNanos(1)))
                       .filter(flight -> departureTimeEnd == null || LocalTime.from(flight.getDepartureTime()).isBefore(departureTimeEnd.plusNanos(1)))
                       .filter(flight -> arrivalTimeStart == null || LocalTime.from(flight.getRelationalFlights().getLast().getArrivalTime()).isAfter(arrivalTimeStart.minusNanos(1)))
                       .filter(flight -> arrivalTimeEnd == null || LocalTime.from(flight.getRelationalFlights().getLast().getArrivalTime()).isBefore(arrivalTimeEnd.plusNanos(1)))
                       .filter(flight -> passengersCount == null || (flight.getSeatsLeft() >= passengersCount && flight.getRelationalFlights().stream().allMatch(f -> f.getSeatsLeft() >= passengersCount)))
                       .sorted(getFlightDTOComparator(sortersList, passengersCount, childrenCount, handLuggageCount, baggageCount))
                       .toList();
    }

    public static Comparator<FlightDTO> getFlightDTOComparator(List<Boolean> sortersList, Integer passengersCount, Integer childrenCount,
                                                               Integer handLuggageCount, Integer baggageCount) {
        List<Comparator<FlightDTO>> comparators = List.of(
                Comparator.comparing(flight -> flight.getPriceForAdult() * passengersCount + flight.getPriceForChild() * childrenCount
                                                       + flight.getPriceForHandLuggage() * handLuggageCount + flight.getPriceForCheckedLuggage() * baggageCount
                                                       + flight.getRelationalFlights().stream().mapToInt(f -> f.getPriceForAdult() * passengersCount + f.getPriceForChild() * childrenCount
                                                                                                                      + f.getPriceForHandLuggage() * handLuggageCount + f.getPriceForCheckedLuggage() * baggageCount).sum()),
                Comparator.comparing(flight -> Duration.between(flight.getDepartureTime(), flight.getRelationalFlights().getLast().getArrivalTime())),
                Comparator.comparing(flight -> LocalTime.from(flight.getDepartureTime())),
                Comparator.comparing(flight -> LocalTime.from(flight.getRelationalFlights().getLast().getArrivalTime()))
        );

        Comparator<FlightDTO> combinedComparator = (flight1, flight2) -> 0;

        for (int i = 0; i < comparators.size(); i++) {
            if (sortersList.get(i)) {
                // aescending comparing
                combinedComparator = combinedComparator.thenComparing(comparators.get(i));
            } else {
                // descending comparing
                combinedComparator = combinedComparator.thenComparing(comparators.get(i).reversed());
            }
        }

        return combinedComparator;
    }
}
