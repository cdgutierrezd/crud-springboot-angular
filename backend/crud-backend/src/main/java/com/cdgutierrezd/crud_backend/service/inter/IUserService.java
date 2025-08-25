package com.cdgutierrezd.crud_backend.service.inter;

import com.cdgutierrezd.crud_backend.model.dto.UserRequest;
import com.cdgutierrezd.crud_backend.model.dto.UserResponse;

import java.util.List;

public interface IUserService {
    List<UserResponse> findAll();

    UserResponse findById(Integer id);

    UserResponse save(UserRequest request);

    UserResponse update(Integer id, UserRequest request);

    void delete(Integer id);
}
