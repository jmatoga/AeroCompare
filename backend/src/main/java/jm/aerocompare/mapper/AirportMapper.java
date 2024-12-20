package jm.aerocompare.mapper;

import jm.aerocompare.dto.AirportDTO;
import jm.aerocompare.model.Airport;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(imports = String.class, componentModel = "spring")
public abstract class AirportMapper {
    @Named("mapToAirport")
    public abstract Airport mapToAirportDTO(AirportDTO airportDTO);

    @Named("mapToAirports")
    public abstract List<Airport> mapToAirports(List<AirportDTO> airportsDTO);

    @Named("mapToAirportDTO")
    public abstract AirportDTO mapToAirportDTO(Airport airport);

    @Named("mapToAirportsDTO")
    public abstract List<AirportDTO> mapToAirportsDTO(List<Airport> airports);
}
