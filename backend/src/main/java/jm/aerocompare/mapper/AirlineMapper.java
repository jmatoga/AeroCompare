package jm.aerocompare.mapper;

import jm.aerocompare.dto.AirlineDTO;
import jm.aerocompare.model.Airline;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(imports = String.class, componentModel = "spring")
public abstract class AirlineMapper {
    @Named("mapToAirlinesDTO")
    public abstract List<AirlineDTO> mapToAirlinesDTO(List<Airline> airlines);

    @Named("mapToAirlineDTO")
    public abstract AirlineDTO mapToAirlineDTO(Airline airline);
}
