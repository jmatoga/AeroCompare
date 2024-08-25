package jm.aerocompare.service;

import jakarta.transaction.Transactional;
//import jm.aerocompare.dto.UserDetailsDTO;
import jm.aerocompare.dto.UserDetailsDTO;
import jm.aerocompare.model.ERole;
import jm.aerocompare.model.User;
//import jm.aerocompare.validation.UserRoleValidator;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import jm.aerocompare.exception.*;
import jm.aerocompare.repository.*;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
//    private final UserRoleValidator userRoleValidator;
    private UserRepository userRepository;
    private PasswordEncoder encoder;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getCurrentUser() throws CurrentUserNotAuthenticatedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            return userRepository.findByEmail(authentication.getName())
                           .orElseThrow(() -> new RuntimeException("Current user not found!"));
        } else throw new CurrentUserNotAuthenticatedException();
    }

    @Override
    @Transactional
    public void registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyTakenException(user.getEmail());
        }

        user.setRole(ERole.ROLE_USER);
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public User getUserById(UUID userId) {
        return userRepository.findById(userId)
                       .orElseThrow(() -> new RuntimeException("User with ID: " + userId + " not found!"));
    }

    @Override
    public void updateUserDetails(UserDetailsDTO userDTO) throws CurrentUserNotAuthenticatedException {
        User user = getCurrentUser();
        if(userDTO.getName() != null && !userDTO.getName().isEmpty())
            user.setName(userDTO.getName());
        if(userDTO.getSurname() != null && !userDTO.getSurname().isEmpty())
            user.setSurname(userDTO.getSurname());
        if(userDTO.getEmail() != null && !userDTO.getEmail().isEmpty())
            user.setEmail(userDTO.getEmail());
        if(userDTO.getPassword() != null && !userDTO.getPassword().isEmpty())
            user.setPassword(encoder.encode(userDTO.getPassword()));
        userRepository.save(user);
    }
//
//    @Override
//    public boolean isModeratorOrAdmin(String userId) {
//        User user = getUserById(userId);
//        return userRoleValidator.isModeratorOrAdmin(user);
//    }

}
