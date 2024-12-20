package jm.aerocompare.security;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import jm.aerocompare.configuration.PropertiesConfig;
import jm.aerocompare.security.payload.LoginAttempt;
import lombok.NonNull;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class LoginAttemptService {
    private final Integer maxAttempt;
    private final Long loginBlockedTime;
    private final LoadingCache<String, LoginAttempt> attemptsCache;

    public LoginAttemptService(PropertiesConfig propertiesConfig) {
        this.maxAttempt = propertiesConfig.getMAX_ATTEMPTS();
        this.loginBlockedTime = propertiesConfig.getLOGIN_BLOCKED_TIME_MIN();
        this.attemptsCache = CacheBuilder.newBuilder()
                                     .expireAfterWrite(loginBlockedTime, TimeUnit.MINUTES)
                                     .build(new CacheLoader<>() {
                                         @Override
                                         @NonNull
                                         public LoginAttempt load(@NonNull String key) {
                                             return new LoginAttempt();
                                         }
                                     });
    }

    public void loginSucceeded(String key) {
        attemptsCache.invalidate(key);
    }

    public LoginAttempt loginFailed(String key) {
        int attempts;
        Instant duration = Instant.now();

        try {
            attempts = attemptsCache.get(key).getAttempt();
            duration = attemptsCache.get(key).getDuration();
        } catch (ExecutionException e) {
            attempts = 1;
        }

        attempts++;
        LoginAttempt loginAttempt = new LoginAttempt(duration, attempts);

        if (attempts <= maxAttempt) {
            loginAttempt.setDuration(Instant.now().plusSeconds(60 * loginBlockedTime));
            attemptsCache.put(key, loginAttempt);
        }
        return loginAttempt;
    }

    public boolean isBlocked(String key) {
        try {
            attemptsCache.cleanUp();
            if (isBlockedFor(key) > 0) {
                return attemptsCache.get(key).getAttempt() >= maxAttempt;
            } else {
                attemptsCache.invalidate(key);
            }
            return false;
        } catch (ExecutionException e) {
            return false;
        }
    }

    public Integer isBlockedFor(String key) {
        try {
            attemptsCache.cleanUp();
            return Duration.between(Instant.now(), attemptsCache.get(key).getDuration()).toMinutesPart() + 1;
        } catch (ExecutionException e) {
            return null;
        }
    }
}
