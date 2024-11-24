package jm.aerocompare.repository;

import jm.aerocompare.model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AirportRepository extends JpaRepository<Airport, UUID> {
    @Query("SELECT a FROM Airport a WHERE 'ALL' ILIKE %:keyword% " +
                   "OR a.name ILIKE %:keyword% " +
                   "OR a.city ILIKE %:keyword% " +
                   "OR a.country ILIKE %:keyword% " +
                   "OR a.iata_code ILIKE %:keyword% " +
                   "OR a.icao_code ILIKE %:keyword%")
    List<Airport> getAirport(String keyword);
}
