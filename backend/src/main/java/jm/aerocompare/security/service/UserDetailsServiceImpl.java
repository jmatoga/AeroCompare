package jm.aerocompare.security.service;

import jm.aerocompare.exception.LoginAttemptException;
import jm.aerocompare.model.User;
import jm.aerocompare.repository.UserRepository;
import jm.aerocompare.security.LoginAttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final LoginAttemptService loginAttemptService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (loginAttemptService.isBlocked(username)) {
            Integer blockedFor = loginAttemptService.isBlockedFor(username);
            throw new LoginAttemptException("Login blocked for: " + blockedFor + "min.");
        }

        User user = userRepository.findByEmail(username)
                            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(user);
    }
}
