package jm.aerocompare.controller;

import jm.aerocompare.dto.FavouriteDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.model.Favourite;
import jm.aerocompare.model.User;
import jm.aerocompare.service.FavouriteService;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FavouriteController {
    private final UserService userService;
    private final FavouriteService favouriteService;

    @PostMapping("/favourites")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> addNewFavourite(@RequestBody FavouriteDTO favouriteDTO
//            @RequestParam(required = false) List<Boolean> sortersList,
//            @RequestParam(defaultValue = "ANY_NUMBER_OF_STOPS") EStopNumber stopNumber,
//            @RequestParam(required = false) List<UUID> departureAirportIdList,
//            @RequestParam(required = false) List<UUID> arrivalAirportIdList,
//            @RequestParam(required = false) LocalDate departureDate,
//            @RequestParam(required = false) List<UUID> airlinesIdList,
//            @RequestParam(required = false) List<EClass> classesList,
//            @RequestParam(required = false) Integer minPrice,
//            @RequestParam(required = false) Integer maxPrice,
//            @RequestParam(required = false) LocalTime departureTimeStart,
//            @RequestParam(required = false) LocalTime departureTimeEnd,
//            @RequestParam(required = false) LocalTime arrivalTimeStart,
//            @RequestParam(required = false) LocalTime arrivalTimeEnd,
//            @RequestParam(required = false) List<DayOfWeek> departureDays,
//            @RequestParam(required = false) Integer tripTime,
//            @RequestParam(defaultValue = "0") Integer passengersCount,
//            @RequestParam(defaultValue = "0") Integer childrenCount,
//            @RequestParam(defaultValue = "0") Integer infantsCount,
//            @RequestParam(defaultValue = "0") Integer handLuggageCount,
//            @RequestParam(defaultValue = "0") Integer baggageCount
    ) throws CurrentUserNotAuthenticatedException {
        User currentUser = userService.getCurrentUser();
//        favouriteService.addNewFavourite(sortersList, stopNumber, departureAirportIdList, arrivalAirportIdList,
//                departureDate, airlinesIdList, classesList, minPrice, maxPrice, departureTimeStart, departureTimeEnd,
//                arrivalTimeStart, arrivalTimeEnd, departureDays, tripTime, passengersCount, childrenCount, infantsCount,
//                handLuggageCount, baggageCount, currentUser.getId());
        favouriteService.addNewFavourite(favouriteDTO, currentUser.getId());
        return ResponseEntity.ok("Favourite added successfully!");
    }

    @GetMapping("/favourites")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<Favourite>> getAllFavourites() throws CurrentUserNotAuthenticatedException {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(new PageImpl<>(favouriteService.getFavouritesByUserId(currentUser.getId())));
    }

    @DeleteMapping("/favourites")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteFavourite(@RequestBody UUID favouriteToDelete) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        favouriteService.deleteFavouriteById(favouriteToDelete);
        return ResponseEntity.ok("Favourite deleted successfully!");
    }
}
