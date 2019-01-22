package com.codeoftheweb.salvo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javafx.beans.binding.DoubleExpression;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;

@Entity
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;
    private Double score;
    private Date date;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;

    public Score() {
    }

    public Score(Date date, Double score, Game game, Player player) {
        this.date = date;
        this.score = score;
        this.game = game;
        this.player = player;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }


    public String toString() {
        return id + " " + score;
    }

}

