package jm.aerocompare.service;

import jm.aerocompare.dto.FlightDTO;
import jm.aerocompare.mapper.FlightMapper;
import jm.aerocompare.repository.FlightRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FlightServiceImpl implements FlightService {
    private final FlightRepository flightRepository;
    private final FlightMapper flightMapper;
    private final AirlineService airlineService;

    @Override
    public Page<FlightDTO> getAllFlights(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return flightMapper.mapToFlightDTOPage(flightRepository.findAll(pageable));
    }
}
