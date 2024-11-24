package jm.aerocompare.service;

import jm.aerocompare.dto.FlightDTO;
import org.springframework.data.domain.Page;

public interface FlightService {
    Page<FlightDTO> getAllFlights(int page, int size);
}
