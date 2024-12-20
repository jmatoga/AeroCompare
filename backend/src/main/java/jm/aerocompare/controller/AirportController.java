package jm.aerocompare.controller;

import jm.aerocompare.dto.AirportDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.model.Airport;
import jm.aerocompare.service.AirportService;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AirportController {
    private final UserService userService;
    private final AirportService airportService;

    @GetMapping("/airports")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Airport>> getAllAirport() throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        return ResponseEntity.ok(airportService.getAllAirports());
    }

    @PostMapping("/airports")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> addNewAirports(@RequestBody List<AirportDTO> airportsDTO) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        airportService.addNewAirports(airportsDTO);
        return ResponseEntity.ok("Airports added successfully!");
    }

    @DeleteMapping("/airports")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteAirports(@RequestBody List<UUID> airportsToDelete) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        airportService.deleteAirports(airportsToDelete);
        return ResponseEntity.ok("Airports deleted successfully!");
    }
}
