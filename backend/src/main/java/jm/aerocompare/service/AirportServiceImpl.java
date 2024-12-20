package jm.aerocompare.service;


import jakarta.transaction.Transactional;
import jm.aerocompare.dto.AirportDTO;
import jm.aerocompare.mapper.AirportMapper;
import jm.aerocompare.model.Airport;
import jm.aerocompare.repository.AirportRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AirportServiceImpl implements AirportService {
    private final AirportRepository airportRepository;
    private final AirportMapper airportMapper;

    @Override
    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    @Override
    public void addNewAirports(List<AirportDTO> airportsDTO) {
        airportRepository.saveAll(airportMapper.mapToAirports(airportsDTO));
    }

    @Override
    @Transactional
    public void deleteAirports(List<UUID> airportsToDelete) {
        airportRepository.deleteAllById(airportsToDelete);
    }
}
