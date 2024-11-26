package jm.aerocompare.repository;

import jm.aerocompare.model.Airline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AirlineRepository extends JpaRepository<Airline, UUID> {

    @Query(value = "SELECT * FROM airlines WHERE id = " +
                           "(SELECT airline_id FROM airline_airplanes " +
                           "WHERE airplane_id = :airplaneId LIMIT 1)", nativeQuery = true)
    Airline findByAirplaneId(@Param("airplaneId") UUID airplaneId);

}
