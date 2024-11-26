package jm.aerocompare.controller;

import jm.aerocompare.dto.FlightDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.model.EClass;
import jm.aerocompare.service.FlightService;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Log4j2
public class FlightController {
    private final UserService userService;
    private final FlightService flightService;

    @GetMapping("/getAllFlights")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_MODERATOR')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<FlightDTO>> getAllFlights(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) List<UUID> airportIdDTOList,
            @RequestParam(required = false) List<EClass> classesList,
            @RequestParam(required = false) List<UUID> airlinesIdList,
            @RequestParam(required = false) LocalDate departureDate,
            @RequestParam(required = false) LocalDateTime departureTimeStart,
            @RequestParam(required = false) LocalDateTime departureTimeEnd,
            @RequestParam(required = false) LocalDateTime arrivalTimeStart,
            @RequestParam(required = false) LocalDateTime arrivalTimeEnd,
            @RequestParam(required = false) List<DayOfWeek> departureDays,
            @RequestParam(required = false) Integer tripTime,
            @RequestParam(required = false) Integer passengersCount) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        return ResponseEntity.ok(flightService.getAllFlights(page, size, airportIdDTOList, classesList, airlinesIdList, departureDate, departureTimeStart,
                departureTimeEnd, arrivalTimeStart, arrivalTimeEnd, departureDays, tripTime, passengersCount));
    }
}
