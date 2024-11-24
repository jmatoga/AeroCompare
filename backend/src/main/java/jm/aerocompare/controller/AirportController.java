package jm.aerocompare.controller;

import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.model.Airport;
import jm.aerocompare.service.AirportService;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Log4j2
public class AirportController {
    private final UserService userService;
    private final AirportService airportService;

    @GetMapping("/getAllAirports")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_MODERATOR')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Airport>> getAllAirport() throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        return ResponseEntity.ok(airportService.getAllAirports());
    }
}
