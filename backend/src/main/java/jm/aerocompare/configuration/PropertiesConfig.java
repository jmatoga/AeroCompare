package jm.aerocompare.configuration;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;

@Configuration
@Scope("singleton")
@PropertySource("classpath:paths.properties")
@Getter
public class PropertiesConfig {
    @SuppressWarnings("squid:S116")
    @Value("${aerocompare.app.pagination.defaultSizeOfPage}")
    private int PAGE_SIZE;

    @SuppressWarnings("squid:S116")
    @Value("${aerocompare.app.accessTokenCookieName}")
    private String accessTokenCookieName;

    @SuppressWarnings("squid:S116")
    @Value("${aerocompare.app.refreshTokenCookieName}")
    private String refreshTokenCookieName;

    @SuppressWarnings("squid:S116")
    @Value("${aerocompare.app.jwtExpirationMs}")
    private Long jwtExpirationMs;

    @SuppressWarnings("squid:S116")
    @Value("${aerocompare.app.refreshTokenExpirationSec}")
    private Long refreshTokenExpirationSec;

    @Value("${aerocompare.app.paths.login}")
    private String PATH_LOGIN;

    @Value("${aerocompare.app.paths.logout}")
    private String PATH_LOGOUT;
}
