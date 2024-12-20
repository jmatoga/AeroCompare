package jm.aerocompare.service;

import jm.aerocompare.dto.HistoryDTO;

import java.util.List;
import java.util.UUID;

public interface HistoryService {
    List<HistoryDTO> getHistoryByUserId(UUID userId);

    void deleteHistoryById(UUID historyToDeleteId);

    void addToHistory(HistoryDTO historyDTO);
}
