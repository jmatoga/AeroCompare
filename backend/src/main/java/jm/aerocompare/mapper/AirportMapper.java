package jm.aerocompare.mapper;

import jm.aerocompare.dto.AirportDTO;
import jm.aerocompare.model.Airport;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(imports = String.class, componentModel = "spring")
public abstract class AirportMapper {
    @Named("mapToAirportDTO")
    public abstract AirportDTO mapToAirportDTO(Airport airport);
}
