package jm.aerocompare.mapper;

import jm.aerocompare.dto.UserDTO;
import jm.aerocompare.model.User;
import jm.aerocompare.security.payload.request.RegisterRequest;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(imports = String.class, componentModel = "spring")
public abstract class UserMapper {

    @Named("mapToUser")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "surname", source = "surname")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "password", source = "password")
    public abstract User mapToUser(RegisterRequest registerRequest);

    @Named("mapToUserDTO")
    @InheritInverseConfiguration(name = "mapToUser")
    public abstract UserDTO mapToUserDTO(User user);

}
