package com.codeoftheweb.salvo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Salvo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;


    @ElementCollection
    @Column(name="salvoLocation")
    private List<String> salvoLocation = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="gamePlayer_id")
    private GamePlayer gamePlayer;

    public Salvo (){
    }

    public Salvo (GamePlayer gamePlayer, Integer turn, List<String> salvoLocation) {
        this.gamePlayer = gamePlayer;
        this.turn = turn;
        this.salvoLocation = salvoLocation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTurn() {
        return turn;
    }
    public void setTurn(Integer turn) {
        this.turnNumber = turn;
    }

    public List<String> getSalvoLocation(){
        return salvoLocation;
    }
    public void setSalvoLocation(List<String> salvoLocation){
        this.salvoLocation = salvoLocation;
    }

    //@JsonIgnore
    public GamePlayer getGamePlayer(){
        return gamePlayer;
    }
    public void setGamePlayer(GamePlayer gamePlayer){
        this.gamePlayer = gamePlayer;
    }

    public String toString() {
        return  id + " " + gamePlayer + "" + turn;
    }
}