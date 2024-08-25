package jm.aerocompare.exception;

public class EmailAlreadyTakenException extends RuntimeException {
    public EmailAlreadyTakenException(String email) {
        super("Email: " + email + " is already taken!");
    }
}
