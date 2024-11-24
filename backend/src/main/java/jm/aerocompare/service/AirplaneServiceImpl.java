package jm.aerocompare.service;

import jm.aerocompare.dto.AirplaneDTO;
import jm.aerocompare.mapper.AirplaneMapper;
import jm.aerocompare.repository.AirplaneRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AirplaneServiceImpl implements AirplaneService {
    private final AirplaneRepository airplaneRepository;
    private final AirplaneMapper airplaneMapper;

    @Override
    public void addNewAirplane(AirplaneDTO airplaneDTO) {
        airplaneRepository.save(airplaneMapper.mapToAirplane(airplaneDTO));
    }
}
