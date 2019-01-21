package com.codeoftheweb.salvo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    Score findById(long id);
}