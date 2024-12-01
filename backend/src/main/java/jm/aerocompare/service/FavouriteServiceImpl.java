package jm.aerocompare.service;

import jm.aerocompare.model.EClass;
import jm.aerocompare.model.EStopNumber;
import jm.aerocompare.model.Favourite;
import jm.aerocompare.repository.FavouriteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FavouriteServiceImpl implements FavouriteService {
    private final FavouriteRepository favouriteRepository;

    @Override
    public void addNewFavourite(List<Boolean> sortersList, EStopNumber stopNumber, List<UUID> departureAirportIdList, List<UUID> arrivalAirportIdList, LocalDate departureDate, List<UUID> airlinesIdList, List<EClass> classesList, Integer minPrice, Integer maxPrice, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer infantsCount, Integer handLuggageCount, Integer baggageCount, UUID currentUserId) {
        Favourite favourite = new Favourite(UUID.randomUUID(), sortersList, stopNumber, departureAirportIdList, arrivalAirportIdList, departureDate, airlinesIdList, classesList, departureDays, minPrice, maxPrice, departureTimeStart, departureTimeEnd, arrivalTimeStart, arrivalTimeEnd, tripTime, passengersCount, childrenCount, infantsCount, handLuggageCount, baggageCount, currentUserId);
        favouriteRepository.save(favourite);
//        favouriteRepository.saveddd(UUID.randomUUID(), sortersList, stopNumber, departureAirportIdList, arrivalAirportIdList, departureDate, airlinesIdList, classesList, departureDays, minPrice, maxPrice, departureTimeStart, departureTimeEnd, arrivalTimeStart, arrivalTimeEnd, tripTime, passengersCount, childrenCount, infantsCount, handLuggageCount, baggageCount, currentUserId);
    }

    @Override
    public List<Favourite> getFavouritesByUserId(UUID userId) {
        return favouriteRepository.findByUserId(userId);
    }
}
