package jm.aerocompare.service;

import jm.aerocompare.model.EClass;
import jm.aerocompare.model.EStopNumber;
import jm.aerocompare.model.Favourite;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface FavouriteService {
    void addNewFavourite(List<Boolean> sortersList, EStopNumber stopNumber, List<UUID> departureAirportIdList, List<UUID> arrivalAirportIdList, LocalDate departureDate, List<UUID> airlinesIdList, List<EClass> classesList, Integer minPrice, Integer maxPrice, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer infantsCount, Integer handLuggageCount, Integer baggageCount, UUID currentUserId);

    List<Favourite> getFavouritesByUserId(UUID userId);
}
