package jm.aerocompare.mapper;

import jm.aerocompare.dto.AirlineDTO;
import jm.aerocompare.dto.FlightDTO;
import jm.aerocompare.dto.RelationalFlightDTO;
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

    @Mapping(target = "airline", expression = "java(getAirlineFromService(flight))")
    @Mapping(target = "relationalFlights", source = "relationalFlights", qualifiedByName = "mapToRelationalFlightDTOList")
    public abstract FlightDTO mapToFlightDTO(Flight flight, List<Flight> relationalFlights);

    public AirlineDTO getAirlineFromService(Flight flight) {
        return airlineService.getAirlineByAirplaneId(flight.getAirplane().getId());
    }

    @Named("mapToRelationalFlightDTOList")
    public List<RelationalFlightDTO> mapToRelationalFlightDTOList(List<Flight> flights) {
        return flights.stream()
                       .map(this::mapToRelationalFlightDTO)
                       .toList();
    }

    @Mapping(target = "airline", expression = "java(getAirlineFromService(flight))")
    public abstract RelationalFlightDTO mapToRelationalFlightDTO(Flight flight);

    @Named("mapToFlightDTOPage")
    public Page<FlightDTO> mapToFlightDTOPage(Page<Flight> flights) {
        return flights.map(this::mapToFlightDTO); // Użycie metody mapującej Flight -> FlightDTO
    }
}
