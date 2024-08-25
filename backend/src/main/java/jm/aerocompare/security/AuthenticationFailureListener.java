package jm.aerocompare.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.stereotype.Component;
import jm.aerocompare.exception.LoginAttemptException;
import jm.aerocompare.security.payload.LoginAttempt;

import jakarta.servlet.http.HttpServletRequest;

@Log
@Component
@RequiredArgsConstructor
public class AuthenticationFailureListener implements ApplicationListener<AuthenticationFailureBadCredentialsEvent> {

    private final HttpServletRequest request;
    private final LoginAttemptService loginAttemptService;

    @Value("${aerocompare.app.max-attempts}")
    Integer maxAttempt;

    @Override
    public void onApplicationEvent(AuthenticationFailureBadCredentialsEvent e) {
        String userEmail = e.getAuthentication().getPrincipal().toString();

        LoginAttempt attempt = loginAttemptService.loginFailed(userEmail);
        throw new LoginAttemptException(
                "Incorrect login details were provided! Attempts left: " + (maxAttempt + 1 - attempt.getAttempt())
        );
    }
}
