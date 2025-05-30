package jm.aerocompare.repository;

import jm.aerocompare.model.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, UUID> {
    List<Favourite> findByUserId(UUID userId);
}
