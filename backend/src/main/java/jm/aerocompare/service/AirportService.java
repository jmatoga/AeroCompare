package jm.aerocompare.service;

import jm.aerocompare.dto.AirportDTO;
import jm.aerocompare.model.Airport;

import java.util.List;
import java.util.UUID;

public interface AirportService {
    List<Airport> getAllAirports();

    void addNewAirports(List<AirportDTO> airportsDTO);

    void deleteAirports(List<UUID> airportsToDelete);
}
