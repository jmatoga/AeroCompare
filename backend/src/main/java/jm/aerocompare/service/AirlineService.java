package jm.aerocompare.service;

import jm.aerocompare.dto.AirlineDTO;

import java.util.List;
import java.util.UUID;

public interface AirlineService {
    List<AirlineDTO> getAllAirlines();

    AirlineDTO getAirlineByAirplaneId(UUID airplaneId);

    void addNewAirlines(List<AirlineDTO> airlines);

    void deleteAirlines(List<UUID> airlinesToDelete);
}
