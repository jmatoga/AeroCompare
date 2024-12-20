package jm.aerocompare.mapper;

import jm.aerocompare.dto.HistoryDTO;
import jm.aerocompare.model.History;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(imports = String.class, componentModel = "spring")
public abstract class HistoryMapper {
    @Named("mapToHistory")
    public abstract History mapToHistory(HistoryDTO historyDTO);

    @Named("mapToHistories")
    public abstract List<History> mapToHistories(List<HistoryDTO> historiesDTO);

    @Named("mapToHistoryDTO")
    public abstract HistoryDTO mapToHistoryDTO(History history);

    @Named("mapToHistoriesDTO")
    public abstract List<HistoryDTO> mapToHistoriesDTO(List<History> histories);
}
