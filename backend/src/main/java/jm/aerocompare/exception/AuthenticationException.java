package jm.aerocompare.exception;

import lombok.extern.log4j.Log4j2;

@Log4j2
public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String message) {
        super(message);
        log.error(message);
    }
}
