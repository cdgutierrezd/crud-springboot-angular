package com.cdgutierrezd.crud_backend.Exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Integer id) {
        super("User with id " + id + " not found");
    }
}
