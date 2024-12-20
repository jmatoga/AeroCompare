package jm.aerocompare.service;

import jakarta.transaction.Transactional;
import jm.aerocompare.dto.AirplaneDTO;
import jm.aerocompare.mapper.AirplaneMapper;
import jm.aerocompare.repository.AirplaneRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AirplaneServiceImpl implements AirplaneService {
    private final AirplaneRepository airplaneRepository;
    private final AirplaneMapper airplaneMapper;

    @Override
    public void addNewAirplanes(List<AirplaneDTO> airplaneDTO) {
        airplaneRepository.saveAll(airplaneMapper.mapToAirplanes(airplaneDTO));
    }

    @Override
    @Transactional
    public void deleteAirplanes(List<UUID> airplanesToDelete) {
        airplaneRepository.deleteAllById(airplanesToDelete);
    }

    @Override
    public List<AirplaneDTO> getAllAirplanes() {
        return airplaneMapper.mapToAirplanesDTO(airplaneRepository.findAll());
    }
}
