package jm.aerocompare.repository;

import jm.aerocompare.model.EClass;
import jm.aerocompare.model.EDayOfWeek;
import jm.aerocompare.model.EStopNumber;
import jm.aerocompare.model.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, UUID> {
    List<Favourite> findByUserId(UUID userId);

    @Query(value = "INSERT INTO public.favourites (id, sorters_list, stop_number, departure_airport_id_list, arrival_airport_id_list, departure_date, airlines_id_list, classes_list, departure_days, min_price, max_price, departure_time_start, departure_time_end, arrival_time_start, arrival_time_end, trip_time, passengers_count, children_count, infants_count, hand_luggage_count, baggage_count, user_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", nativeQuery = true)
    Boolean saveddd(UUID id, List<Boolean> sortersList, EStopNumber stopNumber, List<UUID> departureAirportIdList, List<UUID> arrivalAirportIdList, LocalDate departureDate, List<UUID> airlinesIdList, List<EClass> classesList, List<EDayOfWeek> departureDays, Integer minPrice, Integer maxPrice, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer infantsCount, Integer handLuggageCount, Integer baggageCount, UUID userId);

}
