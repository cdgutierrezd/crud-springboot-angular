package com.cdgutierrezd.crud_backend.service.impl;

import com.cdgutierrezd.crud_backend.Exception.UserNotFoundException;
import com.cdgutierrezd.crud_backend.mapper.UserMapper;
import com.cdgutierrezd.crud_backend.model.dto.UserRequest;
import com.cdgutierrezd.crud_backend.model.dto.UserResponse;
import com.cdgutierrezd.crud_backend.model.entity.User;
import com.cdgutierrezd.crud_backend.repository.UserRepository;
import com.cdgutierrezd.crud_backend.service.inter.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public List<UserResponse> findAll(){
        return userRepository
                .findAll()
                .stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse findById(Integer id){
        return userRepository
                .findById(id)
                .map(userMapper::toResponse)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public UserResponse save(UserRequest request){
        User newUser = userMapper
                .toEntity(request);
        return userMapper
                .toResponse(userRepository.save(newUser));

    }

    @Override
    public UserResponse update(Integer id, UserRequest request){

        User userExists = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        userExists.setName(request.getName());
        userExists.setEmail(request.getEmail());
        userExists.setPhoneNumber(request.getPhoneNumber());

        User userUpdate = userRepository.save(userExists);

        return userMapper.toResponse(userUpdate);
    }
    @Override
    public void delete(Integer id){
        User userExists = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        userRepository.delete(userExists);
    }
}
