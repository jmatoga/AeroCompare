package jm.aerocompare.controller;

import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.model.EClass;
import jm.aerocompare.model.EStopNumber;
import jm.aerocompare.model.Favourite;
import jm.aerocompare.model.User;
import jm.aerocompare.service.FavouriteService;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Log4j2
public class FavouriteController {
    private final UserService userService;
    private final FavouriteService favouriteService;

    @PostMapping("/addFavourite")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_MODERATOR')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> addNewFavourite(
            @RequestParam(required = false) List<Boolean> sortersList,
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
            @RequestParam(defaultValue = "0") Integer infantsCount,
            @RequestParam(defaultValue = "0") Integer handLuggageCount,
            @RequestParam(defaultValue = "0") Integer baggageCount) throws CurrentUserNotAuthenticatedException {
        User currentUser = userService.getCurrentUser();
        favouriteService.addNewFavourite(sortersList, stopNumber, departureAirportIdList, arrivalAirportIdList,
                departureDate, airlinesIdList, classesList, minPrice, maxPrice, departureTimeStart, departureTimeEnd,
                arrivalTimeStart, arrivalTimeEnd, departureDays, tripTime, passengersCount, childrenCount, infantsCount,
                handLuggageCount, baggageCount, currentUser.getId());
        return ResponseEntity.ok("Favourite added successfully!");
    }

    @GetMapping("/getFavourites")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_MODERATOR')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Favourite>> addNewFavourite() throws CurrentUserNotAuthenticatedException {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(favouriteService.getFavouritesByUserId(currentUser.getId()));
    }
}
