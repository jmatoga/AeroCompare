package jm.aerocompare.security;

import jm.aerocompare.configuration.PropertiesConfig;
import jm.aerocompare.exception.LoginAttemptException;
import jm.aerocompare.security.payload.LoginAttempt;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationFailureListener implements ApplicationListener<AuthenticationFailureBadCredentialsEvent> {
    private final LoginAttemptService loginAttemptService;
    private final PropertiesConfig propertiesConfig;

    @Override
    public void onApplicationEvent(AuthenticationFailureBadCredentialsEvent e) {
        String userEmail = e.getAuthentication().getPrincipal().toString();

        LoginAttempt attempt = loginAttemptService.loginFailed(userEmail);
        throw new LoginAttemptException(
                "Incorrect login details were provided! Attempts left: " + (propertiesConfig.getMAX_ATTEMPTS() + 1 - attempt.getAttempt())
        );
    }
}
