package jm.aerocompare.controller;

import jm.aerocompare.dto.AirplaneDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.service.AirplaneService;
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
public class AirplaneController {
    private final UserService userService;
    private final AirplaneService airplaneService;

    @GetMapping("/airplanes")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<AirplaneDTO>> getAllAirplanes() throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        return ResponseEntity.ok(airplaneService.getAllAirplanes());
    }

    @PostMapping("/airplanes")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> addNewAirplanes(@RequestBody List<AirplaneDTO> airplaneDTO) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        airplaneService.addNewAirplanes(airplaneDTO);
        return ResponseEntity.ok("Airplanes added successfully!");
    }

    @DeleteMapping("/airplanes")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteAirplane(@RequestBody List<UUID> airplanesToDelete) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        airplaneService.deleteAirplanes(airplanesToDelete);
        return ResponseEntity.ok("Airplanes deleted successfully!");
    }
}
