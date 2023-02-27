package com.example.java.bookevidence.controller;

import org.springframework.http.HttpStatus;

import java.io.Serial;

/**
 * Exception used to be thrown to client.
 * More: <a href="https://stackoverflow.com/questions/32441919/how-return-error-message-in-spring-mvc-controller">...</a>
 *
 * @author Libor Grigerek
 *
 */
public class ResourceException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = -1245984699958266736L;
    
    private final HttpStatus httpStatus;

    /**
     * Constructor
     * @param httpStatus HTTP status
     * @param message message
     */
    public ResourceException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
