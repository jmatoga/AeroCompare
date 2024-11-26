package jm.aerocompare.repository;

import jm.aerocompare.model.EClass;
import jm.aerocompare.model.Flight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FlightRepository extends JpaRepository<Flight, UUID> {

    @Query("SELECT f FROM Flight f WHERE f.seatsLeft <= :passengersCount " +
                   "AND (:airportIdDTOList IS NULL OR f.departureAirport.id IN :airportIdDTOList) " +
                   "AND (:airlinesIdList IS NULL OR f.airplane.airline.id IN :airlinesIdList) " +
                   "AND (:classesList IS NULL OR f.eClass IN :classesList)")
    Page<Flight> findFlightBySimpleFilters(Pageable pageable,
                                           @Param("airportIdDTOList") List<UUID> airportIdDTOList,
                                           @Param("airlinesIdList") List<UUID> airlinesIdList,
                                           @Param("classesList") List<EClass> classesList,
                                           @Param("passengersCount") Integer passengersCount);
}
