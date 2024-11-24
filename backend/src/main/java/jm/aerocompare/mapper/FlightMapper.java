package jm.aerocompare.mapper;

import jm.aerocompare.dto.AirlineDTO;
import jm.aerocompare.dto.FlightDTO;
import jm.aerocompare.model.Flight;
import jm.aerocompare.service.AirlineService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(imports = String.class, componentModel = "spring", uses = {AirlineMapper.class, AirplaneMapper.class, AirportMapper.class})
public abstract class FlightMapper {
    @Autowired
    private AirlineService airlineService;

    @Mapping(target = "airline", expression = "java(getAirlineFromService(flight))")
    public abstract FlightDTO mapToFlightDTO(Flight flight);

    public AirlineDTO getAirlineFromService(Flight flight) {
        return airlineService.getAirlineByAirplaneId(flight.getAirplane().getId());
    }

    @Named("mapToFlightDTOList")
    public abstract List<FlightDTO> mapToFlightDTOList(List<Flight> flights);

    @Named("mapToFlightDTOPage")
    public Page<FlightDTO> mapToFlightDTOPage(Page<Flight> flights) {
        return flights.map(this::mapToFlightDTO); // Użycie metody mapującej Flight -> FlightDTO
    }
}
