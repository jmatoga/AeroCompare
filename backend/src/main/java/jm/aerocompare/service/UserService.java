package jm.aerocompare.service;

//import jm.aerocompare.dto.UserDetailsDTO;
import jm.aerocompare.dto.UserDetailsDTO;
import jm.aerocompare.exception.CurrentUserNotAuthenticatedException;
import jm.aerocompare.model.User;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<User> getAllUsers();

    User getCurrentUser() throws CurrentUserNotAuthenticatedException;

    void registerUser(User user);

    User getUserById(UUID id);

    void updateUserDetails(UserDetailsDTO userDTO) throws CurrentUserNotAuthenticatedException;
//
//    boolean isModeratorOrAdmin(String userId);
}
