package jm.aerocompare.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class AllowedPathsConfig {
    @Bean("allowedPaths")
    public String[] allowedPaths() {
        return new String[]{
                "/api/auth/**",
        };
    }
}
