package jm.aerocompare.service;

import jakarta.transaction.Transactional;
import jm.aerocompare.dto.HistoryDTO;
import jm.aerocompare.mapper.HistoryMapper;
import jm.aerocompare.repository.HistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class HistoryServiceImpl implements HistoryService {
    private final HistoryRepository historyRepository;
    private final HistoryMapper historyMapper;

    @Override
    public List<HistoryDTO> getHistoryByUserId(UUID userId) {
        return historyMapper.mapToHistoriesDTO(historyRepository.findByUserId(userId));
    }

    @Override
    @Transactional
    public void deleteHistoryById(UUID historyToDeleteId) {
        historyRepository.deleteById(historyToDeleteId);
    }

    @Override
    public void addToHistory(HistoryDTO historyDTO) {
        historyRepository.save(historyMapper.mapToHistory(historyDTO));
    }
}
