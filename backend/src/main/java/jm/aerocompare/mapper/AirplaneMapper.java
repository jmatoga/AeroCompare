package jm.aerocompare.mapper;

import jm.aerocompare.dto.AirplaneDTO;
import jm.aerocompare.model.Airplane;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(imports = String.class, componentModel = "spring")
public abstract class AirplaneMapper {
    @Named("mapToAirlineDTO")
    public abstract Airplane mapToAirplane(AirplaneDTO airplaneDTO);
}
