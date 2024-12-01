package jm.aerocompare.repository;

import jm.aerocompare.model.EClass;
import jm.aerocompare.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FlightRepository extends JpaRepository<Flight, UUID> {

    @Query("SELECT DISTINCT f FROM Flight f WHERE f.seatsLeft >= :passengersCount + :childrenCount " +
                   "AND (:departureAirportIdList IS NULL OR f.departureAirport.id IN :departureAirportIdList) " +
                   "AND (:arrivalAirportIdList IS NULL OR f.arrivalAirport.id IN :arrivalAirportIdList) " +
                   "AND (:airlinesIdList IS NULL OR f.airplane.airline.id IN :airlinesIdList) " +
                   "AND (:minPrice IS NULL OR ((f.priceForAdult * :passengersCount) + (f.priceForChild * :childrenCount)" +
                   " + (f.priceForHandLuggage * :handLuggageCount) + (f.priceForCheckedLuggage) * :baggageCount >= :minPrice))" +
                   "AND (:maxPrice IS NULL OR ((f.priceForAdult * :passengersCount) + (f.priceForChild * :childrenCount)" +
                   " + (f.priceForHandLuggage * :handLuggageCount) + (f.priceForCheckedLuggage) * :baggageCount <= :maxPrice))" +
                   "AND (:classesList IS NULL OR f.eClass IN :classesList)")
    List<Flight> findFlightBySimpleFilters(@Param("departureAirportIdList") List<UUID> departureAirportIdList,
                                           @Param("arrivalAirportIdList") List<UUID> arrivalAirportIdList,
                                           @Param("classesList") List<EClass> classesList,
                                           @Param("airlinesIdList") List<UUID> airlinesIdList,
                                           @Param("minPrice") Integer minPrice,
                                           @Param("maxPrice") Integer maxPrice,
                                           @Param("passengersCount") Integer passengersCount,
                                           @Param("childrenCount") Integer childrenCount,
                                           @Param("handLuggageCount") Integer handLuggageCount,
                                           @Param("baggageCount") Integer baggageCount);

    @Query("SELECT DISTINCT f FROM Flight f WHERE f.seatsLeft >= :passengersCount + :childrenCount " +
                   "AND f.departureAirport.id IN :departureAirportIdList " +
                   "AND (:airlinesIdList IS NULL OR f.airplane.airline.id IN :airlinesIdList) " +
                   "AND (:classesList IS NULL OR f.eClass IN :classesList)")
    List<Flight> flightsFrom1StopWithSimpleFilters(@Param("departureAirportIdList") List<UUID> departureAirportIdList,
                                                   @Param("classesList") List<EClass> classesList,
                                                   @Param("airlinesIdList") List<UUID> airlinesIdList,
                                                   @Param("passengersCount") Integer passengersCount,
                                                   @Param("childrenCount") Integer childrenCount);

    @Query("SELECT DISTINCT f FROM Flight f WHERE f.seatsLeft >= :passengersCount + :childrenCount " +
                   "AND f.departureAirport.id NOT IN :departureAirportIdList " +
                   "AND f.arrivalAirport.id IN :arrivalAirportIdList " +
                   "AND (:airlinesIdList IS NULL OR f.airplane.airline.id IN :airlinesIdList) " +
                   "AND (:classesList IS NULL OR f.eClass IN :classesList)")
    List<Flight> flightsTo1StopWithSimpleFilters(@Param("departureAirportIdList") List<UUID> departureAirportIdList,
                                                 @Param("arrivalAirportIdList") List<UUID> arrivalAirportIdList,
                                                 @Param("classesList") List<EClass> classesList,
                                                 @Param("airlinesIdList") List<UUID> airlinesIdList,
                                                 @Param("passengersCount") Integer passengersCount,
                                                 @Param("childrenCount") Integer childrenCount);
}
