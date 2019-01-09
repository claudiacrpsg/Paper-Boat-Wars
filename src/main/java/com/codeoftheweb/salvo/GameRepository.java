package com.codeoftheweb.salvo;

import java.util.List;

import org.aspectj.apache.bcel.util.Play;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
    Game findById(long id); //no need for List because this is a unique id
}


