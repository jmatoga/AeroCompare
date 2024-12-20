package jm.aerocompare.mapper;

import jm.aerocompare.dto.FavouriteDTO;
import jm.aerocompare.model.Favourite;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.UUID;

@Mapper(imports = String.class, componentModel = "spring")
public abstract class FavouriteMapper {
    @Named("mapToFavourite")
    @Mapping(target = "userId", source = "userId")
    public abstract Favourite mapToFavourite(FavouriteDTO favouriteDTO, UUID userId);

    @Named("mapToFavourites")
    public abstract List<Favourite> mapToFavourites(List<FavouriteDTO> favouritesDTO);
}
