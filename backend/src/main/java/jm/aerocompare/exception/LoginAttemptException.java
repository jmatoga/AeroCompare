package jm.aerocompare.exception;

public class LoginAttemptException extends RuntimeException {
    public LoginAttemptException(String message) {
        super(message);
    }
}
