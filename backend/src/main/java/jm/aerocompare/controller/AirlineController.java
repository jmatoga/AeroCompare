package jm.aerocompare.controller;

import jm.aerocompare.dto.AirlineDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.service.AirlineService;
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
public class AirlineController {
    private final UserService userService;
    private final AirlineService airlineService;

    @GetMapping("/airlines")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<AirlineDTO>> getAllAirlines() throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        return ResponseEntity.ok(airlineService.getAllAirlines());
    }

    @PostMapping("/airlines")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> addNewAirlines(@RequestBody List<AirlineDTO> airlines) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        airlineService.addNewAirlines(airlines);
        return ResponseEntity.ok("Airlines added successfully!");
    }

    @DeleteMapping("/airlines")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteAirlines(@RequestBody List<UUID> airlinesToDelete) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        airlineService.deleteAirlines(airlinesToDelete);
        return ResponseEntity.ok("Airlines deleted successfully!");
    }
}
