package com.codeoftheweb.salvo;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Entity
public class Game{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;
    private Date date;


    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    private Set<GamePlayer> gamePlayers = new HashSet<>(); //this has to be initialized


    public void addGamePlayer(GamePlayer gamePlayer) {
        gamePlayer.setGame(this);
        gamePlayers.add(gamePlayer);
    }

    public Game(){
        this.date = new Date();
        this.id = id;
    }
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<GamePlayer> getGamePlayers(){
        return this.gamePlayers;
    }

    public String toString() {
        return date + "" + id;
    }

}