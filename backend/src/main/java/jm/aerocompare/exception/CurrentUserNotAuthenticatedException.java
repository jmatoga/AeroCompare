package jm.aerocompare.exception;

public class CurrentUserNotAuthenticatedException extends Exception {
    public CurrentUserNotAuthenticatedException() {
        super("Current user is not authenticated!");
    }
}
