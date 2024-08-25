package jm.aerocompare.controller;

import jm.aerocompare.dto.UserDTO;
//import jm.aerocompare.dto.UserDetailsDTO;
import jm.aerocompare.dto.UserDetailsDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.mapper.UserMapper;
import jm.aerocompare.model.User;
import jm.aerocompare.security.payload.response.MessageResponse;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Log4j2
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/users")
    ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/currentUser")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_MODERATOR')" + "or hasRole('ROLE_ADMIN')" )
    ResponseEntity<UserDTO> getCurrentUser() throws CurrentUserNotAuthenticatedException {
        User currentUser = userService.getCurrentUser();
        UserDTO dto = userMapper.mapToUserDTO(userService.getUserById(currentUser.getId()));
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/userDetails")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_MODERATOR')" + "or hasRole('ROLE_ADMIN')" )
    ResponseEntity<MessageResponse> updateUserDetails(@RequestBody UserDetailsDTO userDTO) throws CurrentUserNotAuthenticatedException {
        userService.updateUserDetails(userDTO);
        return ResponseEntity.ok(new MessageResponse("User details updated successfully!"));
    }
//
//    @GetMapping("/userRoles")
//    ResponseEntity<Boolean> getUserRoles() throws CurrentUserNotAuthenticatedException {
//        return ResponseEntity.ok(userService.isModeratorOrAdmin(userService.getCurrentUser().getId()));
//    }
}
