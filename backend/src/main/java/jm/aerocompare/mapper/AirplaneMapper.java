package jm.aerocompare.mapper;

import jm.aerocompare.dto.AirplaneDTO;
import jm.aerocompare.model.Airplane;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(imports = String.class, componentModel = "spring")
public abstract class AirplaneMapper {
    @Named("mapToAirline")
    public abstract Airplane mapToAirplane(AirplaneDTO airplaneDTO);

    @Named("mapToAirlines")
    public abstract List<Airplane> mapToAirplanes(List<AirplaneDTO> airplaneDTO);

    @Named("mapToAirlineDTO")
    public abstract AirplaneDTO mapToAirplaneDTO(Airplane airplane);

    @Named("mapToAirlinesDTO")
    public abstract List<AirplaneDTO> mapToAirplanesDTO(List<Airplane> airplane);
}
