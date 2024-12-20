package jm.aerocompare.service;

import jakarta.transaction.Transactional;
import jm.aerocompare.dto.FavouriteDTO;
import jm.aerocompare.mapper.FavouriteMapper;
import jm.aerocompare.model.Favourite;
import jm.aerocompare.repository.FavouriteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class FavouriteServiceImpl implements FavouriteService {
    private final FavouriteRepository favouriteRepository;
    private final FavouriteMapper favouriteMapper;

//    @Override
//    public void addNewFavourite(List<Boolean> sortersList, EStopNumber stopNumber, List<UUID> departureAirportIdList, List<UUID> arrivalAirportIdList, LocalDate departureDate, List<UUID> airlinesIdList, List<EClass> classesList, Integer minPrice, Integer maxPrice, LocalTime departureTimeStart, LocalTime departureTimeEnd, LocalTime arrivalTimeStart, LocalTime arrivalTimeEnd, List<DayOfWeek> departureDays, Integer tripTime, Integer passengersCount, Integer childrenCount, Integer infantsCount, Integer handLuggageCount, Integer baggageCount, UUID currentUserId) {
//        favouriteRepository.save(favourite);
//    }

    @Override
    public void addNewFavourite(FavouriteDTO favouriteDTO, UUID currentUser) {
        favouriteRepository.save(favouriteMapper.mapToFavourite(favouriteDTO, currentUser));
    }

    @Override
    public List<Favourite> getFavouritesByUserId(UUID userId) {
        return favouriteRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public void deleteFavouriteById(UUID favouriteToDelete) {
        favouriteRepository.deleteById(favouriteToDelete);
    }
}
