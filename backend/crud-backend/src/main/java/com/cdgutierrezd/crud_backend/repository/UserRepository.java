package com.cdgutierrezd.crud_backend.repository;

import com.cdgutierrezd.crud_backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User,Integer> {
}
