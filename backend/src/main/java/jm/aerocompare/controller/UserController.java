package jm.aerocompare.controller;

import jm.aerocompare.dto.UserDTO;
import jm.aerocompare.dto.UserDetailsDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.mapper.UserMapper;
import jm.aerocompare.model.ERole;
import jm.aerocompare.model.User;
import jm.aerocompare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/users")
    ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/currentUser")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    ResponseEntity<UserDTO> getCurrentUser() throws CurrentUserNotAuthenticatedException {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(userMapper.mapToUserDTO(userService.getUserById(currentUser.getId())));
    }

    @PutMapping("/userDetails")
    @PreAuthorize("hasRole('ROLE_USER')" + "or hasRole('ROLE_ADMIN')")
    ResponseEntity<String> updateUserDetails(@RequestBody UserDetailsDTO userDTO) throws CurrentUserNotAuthenticatedException {
        userService.updateUserDetails(userDTO);
        return ResponseEntity.ok("User details updated successfully!");
    }

    @GetMapping("/currentUserRole")
    ResponseEntity<ERole> isAdmin() throws CurrentUserNotAuthenticatedException {
        return ResponseEntity.ok(userService.getRole(userService.getCurrentUser().getId()));
    }
}
