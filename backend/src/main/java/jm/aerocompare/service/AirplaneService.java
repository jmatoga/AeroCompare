package jm.aerocompare.service;

import jm.aerocompare.dto.AirplaneDTO;

import java.util.List;
import java.util.UUID;

public interface AirplaneService {
    void addNewAirplanes(List<AirplaneDTO> airplaneDTO);

    void deleteAirplanes(List<UUID> airplanesToDelete);

    List<AirplaneDTO> getAllAirplanes();
}
