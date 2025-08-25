package com.cdgutierrezd.crud_backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ErrorResponse {
    private LocalDateTime date;
    private int status;
    private String error;
    private String message;
    private String path;
}
