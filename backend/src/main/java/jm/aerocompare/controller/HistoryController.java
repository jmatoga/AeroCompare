package jm.aerocompare.controller;

import jm.aerocompare.dto.HistoryDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.model.User;
import jm.aerocompare.service.HistoryService;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HistoryController {
    private final UserService userService;
    private final HistoryService historyService;

    @GetMapping("/history")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<HistoryDTO>> getAllHistory() throws CurrentUserNotAuthenticatedException {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(new PageImpl<>(historyService.getHistoryByUserId(currentUser.getId())));
    }

    @DeleteMapping("/history")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteHistory(@RequestBody UUID historyToDeleteId) throws CurrentUserNotAuthenticatedException {
        userService.getCurrentUser();
        historyService.deleteHistoryById(historyToDeleteId);
        return ResponseEntity.ok("History deleted successfully!");
    }
}
