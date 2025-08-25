package com.cdgutierrezd.crud_backend.mapper;

import com.cdgutierrezd.crud_backend.model.dto.UserRequest;
import com.cdgutierrezd.crud_backend.model.dto.UserResponse;
import com.cdgutierrezd.crud_backend.model.entity.User;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserMapper {

    private final ModelMapper modelMapper;

    public UserResponse toResponse(User user){
        return modelMapper.map(user,UserResponse.class);
    }

    public User toEntity(UserRequest request){
        return modelMapper.map(request,User.class);
    }
}
