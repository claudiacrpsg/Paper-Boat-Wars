package com.codeoftheweb.salvo;
import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api")
public class SalvoController {

    @Autowired
    private PlayerRepository repository;
    @Autowired
    private GameRepository gameRep;
    @Autowired
    private GamePlayerRepository gamePlayerRep;
    @Autowired
    private PasswordEncoder passwordEncoder;


//    @RequestMapping("/players")
//    public List<Player> getPlayer() {
//        return repository.findAll();
//    }


    @RequestMapping("/games")
    public Map<String, Object> getGame(Authentication authentication) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        if(isGuest(authentication)){
            dto.put("currentPlayer", null);
        }else{
            dto.put("currentPlayer", playerDTO(isAuth(authentication)));
        }
        dto.put("games", gameRep
                .findAll()
                .stream()
                .map(game -> gameDTO(game))
                .collect(toList()));
    return dto;
    }


    @RequestMapping("/gamePlayer")
    public List<GamePlayer> getGamePlayer() {
        return gamePlayerRep.findAll();
    }


    private Map<String, Object> gameDTO(Game game) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", game.getId());
        dto.put("created", game.getDate());
        dto.put("gamePlayers", game.getGamePlayers()
                .stream()
                .map(gamePlayer -> gamePlayerDTO(gamePlayer))
                .collect(toList()));
        return dto;
    }

    private Map<String, Object> gamePlayerDTO(GamePlayer gamePlayer) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", gamePlayer.getId());
        dto.put("player", playerDTO(gamePlayer.getPlayer()));
        if(gamePlayer.getScores() != null) {
            dto.put("score", gamePlayer.getScores().getScore());
        }else{
            dto.put("score", null);
        }
        return dto;
    }

    private Map<String, Object> playerDTO(Player player) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", player.getId());
        dto.put("userName", player.getUserName());
        dto.put("email", player.getEmail());
        return dto;
    }


    @RequestMapping("/game_view/{gameId}")
    private Map<String, Object> gameViewDTO (@PathVariable Long gameId, Authentication authentication) {
        GamePlayer gamePlayer = gamePlayerRep.getOne(gameId);
        if (gamePlayer.getPlayer().getId() == isAuth(authentication).getId()) {
            Map<String, Object> dto = new LinkedHashMap<String, Object>();
            dto.put("GameId", gamePlayer.getGame().getId());
            dto.put("created", gamePlayer.getGame().getDate());
            dto.put("GamePlayers", gamePlayer.getGame().getGamePlayers().stream().map(gamePlayer1 -> gamePlayerDTO(gamePlayer1)).collect(Collectors.toList()));
            dto.put("Ships", gamePlayer.getShips().stream().map(ship -> shipsDTO(ship)).collect(Collectors.toList()));
            dto.put("Salvoes", gamePlayer.getSalvoes().stream().map(salvo -> salvoesDTO(salvo)).collect(Collectors.toList()));
            if (oppGamePlayer(gamePlayer) != null) {
                dto.put("EnemySalvoes", oppGamePlayer(gamePlayer).getSalvoes().stream().map(salvo -> salvoesDTO(salvo)).collect(Collectors.toList()));
            }
            return dto;
        } else {
            return playerInfo("YOU SHALL NOT PASS!", HttpStatus.FORBIDDEN);
        }
    }

    //access enemy information
    public GamePlayer oppGamePlayer(GamePlayer gamePlayer){
        return gamePlayer.getGame().getGamePlayers().stream().filter(gamePlayer1 -> gamePlayer1.getId() != gamePlayer.getId()).findAny().orElse(null);

    }


    @RequestMapping("/ships")
    public Map<String, Object> shipsDTO(Ship ship) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("ShipId", ship.getId());
        dto.put("Type", ship.getType());
        dto.put("Location", ship.getLocation());

        return dto;
    }

    @RequestMapping("/salvoes")
    public Map<String, Object> salvoesDTO(Salvo salvo) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("SalvoId", salvo.getId());
        dto.put("Turn", salvo.getTurn());
        dto.put("SalvoLocation", salvo.getSalvoLocation());

        return dto;
    }

    @RequestMapping("/scores")
    public Map<String, Object> scoresDTO(Score score) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("Score", score.getScore());
        dto.put("FinishDate", score.getDate());
        dto.put("Player", playerDTO(score.getPlayer()));
        return dto;
    }

    @RequestMapping("/leaderboard")
    public Map<String, Object> leaderboardDTO(GamePlayer gamePlayer) {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        List<GamePlayer> gamePlayers = gamePlayerRep.findAll();
        for (GamePlayer gp: gamePlayers) {
            Map<String, Object> scores = new LinkedHashMap<String, Object>();
            if(!scores.containsKey(gp.getPlayer().getUserName())){
                scores.put("wins", gp.getPlayer().getScores().stream().filter(score -> score.getScore() == 1).count());
                scores.put("losses", gp.getPlayer().getScores().stream().filter(score -> score.getScore() == 0).count());
                scores.put("ties", gp.getPlayer().getScores().stream().filter(score -> score.getScore() == 0.5).count());
                scores.put("TotalScore", gp.getPlayer().getScores().stream().mapToDouble(score -> score.getScore()).sum());
                dto.put(gp.getPlayer().getUserName(), scores);
            }
        }
        return dto;
    }

    @RequestMapping(path = "/players", method = RequestMethod.POST)
    public ResponseEntity<Object> register(@RequestBody Player player) {
        if (player.getUserName().isEmpty() || player.getEmail().isEmpty() || player.getPassword().isEmpty()) {
            return new ResponseEntity<>("Missing data", HttpStatus.FORBIDDEN);
        }
        if (repository.findByEmail(player.getEmail()) !=  null) {
            return new ResponseEntity<>("Email already in use", HttpStatus.FORBIDDEN);
        }
        repository.save(new Player(player.getUserName(), player.getEmail(),player.getPassword()));
        return new ResponseEntity<>(playerInfo("userName", player.getUserName()), HttpStatus.CREATED);
    }

    private Map<String, Object> playerInfo(String key, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put(key, value);
        return map;
    }


    private boolean isGuest(Authentication authentication) {
        return authentication == null || authentication instanceof AnonymousAuthenticationToken;
    }

    private Player isAuth (Authentication authentication){
        return repository.findByEmail(authentication.getName());
    }
}
