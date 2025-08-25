package com.cdgutierrezd.crud_backend.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRequest {

    @NotBlank(message = "The name cannot be empty")
    private String name;

    @NotBlank(message = "The email cannot be empty")
    @Email(message = "The email is invalid")
    private String email;
    private String phoneNumber;
}
