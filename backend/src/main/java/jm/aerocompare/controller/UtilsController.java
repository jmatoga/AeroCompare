package jm.aerocompare.controller;

import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.model.EClass;
import jm.aerocompare.model.EStopNumber;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UtilsController {
    private final UserService userService;

    @GetMapping("/classes")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<EClass>> getAllClasses() throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        return ResponseEntity.ok(List.of(EClass.values()));
    }

    @GetMapping("/stopNumbers")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<EStopNumber>> getAllStopNumbers() throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        return ResponseEntity.ok(List.of(EStopNumber.values()));
    }
}
