package jm.aerocompare.service;

import jakarta.transaction.Transactional;
import jm.aerocompare.dto.AirlineDTO;
import jm.aerocompare.mapper.AirlineMapper;
import jm.aerocompare.repository.AirlineRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AirlineServiceImpl implements AirlineService {
    private final AirlineRepository airlineRepository;
    private final AirlineMapper airlineMapper;

    @Override
    public List<AirlineDTO> getAllAirlines() {
        return airlineMapper.mapToAirlinesDTO(airlineRepository.findAll());
    }

    @Override
    public AirlineDTO getAirlineByAirplaneId(UUID airplaneId) {
        return airlineMapper.mapToAirlineDTO(airlineRepository.findByAirplaneId(airplaneId));
    }

    @Override
    public void addNewAirlines(List<AirlineDTO> airlines) {
        airlineRepository.saveAll(airlineMapper.mapToAirlines(airlines));
    }

    @Override
    @Transactional
    public void deleteAirlines(List<UUID> airlinesToDelete) {
        airlineRepository.deleteAllById(airlinesToDelete);
    }
}
