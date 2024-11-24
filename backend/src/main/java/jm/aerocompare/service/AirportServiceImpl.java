package jm.aerocompare.service;


import jm.aerocompare.model.Airport;
import jm.aerocompare.repository.AirportRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AirportServiceImpl implements AirportService {
    private final AirportRepository airportRepository;

    @Override
    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }
}
