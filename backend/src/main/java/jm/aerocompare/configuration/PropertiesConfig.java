package jm.aerocompare.configuration;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
@Scope("singleton")
@Getter
public class PropertiesConfig {
    @Value("${aerocompare.app.accessTokenCookieName}")
    private String ACCESS_TOKEN_COOKIE_NAME;

    @Value("${aerocompare.app.jwtExpirationMs}")
    private Long JWT_EXPIRATION_MS;

    @Value("${aerocompare.app.maxAtempts}")
    private Integer MAX_ATTEMPTS;

    @Value("${aerocompare.app.loginBlockedMin}")
    private Long LOGIN_BLOCKED_TIME_MIN;
}
