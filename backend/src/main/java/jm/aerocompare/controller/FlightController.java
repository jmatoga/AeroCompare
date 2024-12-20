package jm.aerocompare.controller;

import jm.aerocompare.dto.FlightDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.model.EClass;
import jm.aerocompare.model.EStopNumber;
import jm.aerocompare.service.FlightService;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FlightController {
    private final UserService userService;
    private final FlightService flightService;

    @GetMapping("/flights")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_MODERATOR')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<FlightDTO>> getAllFlights(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam List<Boolean> sortersList,
            @RequestParam(defaultValue = "ANY_NUMBER_OF_STOPS") EStopNumber stopNumber,
            @RequestParam(required = false) List<UUID> departureAirportIdList,
            @RequestParam(required = false) List<UUID> arrivalAirportIdList,
            @RequestParam(required = false) LocalDate departureDate,
            @RequestParam(required = false) List<UUID> airlinesIdList,
            @RequestParam(required = false) List<EClass> classesList,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) LocalTime departureTimeStart,
            @RequestParam(required = false) LocalTime departureTimeEnd,
            @RequestParam(required = false) LocalTime arrivalTimeStart,
            @RequestParam(required = false) LocalTime arrivalTimeEnd,
            @RequestParam(required = false) List<DayOfWeek> departureDays,
            @RequestParam(required = false) Integer tripTime,
            @RequestParam(defaultValue = "0") Integer passengersCount,
            @RequestParam(defaultValue = "0") Integer childrenCount,
            @RequestParam(defaultValue = "0") Integer handLuggageCount,
            @RequestParam(defaultValue = "0") Integer baggageCount) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        if (stopNumber.equals(EStopNumber.DIRECT) || stopNumber.equals(EStopNumber.ANY_NUMBER_OF_STOPS)) {
            return ResponseEntity.ok(flightService.getDirectFlights(page, size, sortersList, departureAirportIdList, arrivalAirportIdList, departureDate,
                    classesList, airlinesIdList, minPrice, maxPrice, departureTimeStart, departureTimeEnd, arrivalTimeStart,
                    arrivalTimeEnd, departureDays, tripTime, passengersCount, childrenCount, handLuggageCount, baggageCount));
        } else if (stopNumber.equals(EStopNumber.UP_TO_1_STOP)) {
            return ResponseEntity.ok(flightService.getDirectAndUpTo1Flights(page, size, sortersList, departureAirportIdList, arrivalAirportIdList, departureDate,
                    classesList, airlinesIdList, minPrice, maxPrice, departureTimeStart, departureTimeEnd, arrivalTimeStart,
                    arrivalTimeEnd, departureDays, tripTime, passengersCount, childrenCount, handLuggageCount, baggageCount));
        }
//        return ResponseEntity.ok(flightService.getAllFlights(page, size, sortersList, departureAirportIdList, arrivalAirportIdList, departureDate,
//                classesList, airlinesIdList, minPrice, maxPrice, departureTimeStart, departureTimeEnd, arrivalTimeStart,
//                arrivalTimeEnd, departureDays, tripTime, passengersCount, childrenCount, handLuggageCount, baggageCount));
        return null;
    }
}
