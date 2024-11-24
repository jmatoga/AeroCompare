package jm.aerocompare.controller;

import jm.aerocompare.dto.AirplaneDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.service.AirplaneService;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Log4j2
public class AirplaneController {
    private final UserService userService;
    private final AirplaneService airplaneService;

    @PostMapping("/addNewAirplane")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> addNewAirplane(@RequestBody AirplaneDTO airplaneDTO) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        airplaneService.addNewAirplane(airplaneDTO);
        return ResponseEntity.ok("Airplane added successfully!");
    }
}
