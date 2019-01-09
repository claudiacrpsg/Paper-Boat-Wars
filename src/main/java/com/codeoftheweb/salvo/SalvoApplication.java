package com.codeoftheweb.salvo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
	}
		@Bean
		public CommandLineRunner initData (PlayerRepository repository, GameRepository gameRep, GamePlayerRepository gamePlayerRep, ShipRepository shipRep) {
			return (args) -> {
				// save a couple of customers
				Player p1 = new Player("Jack Bauer", "j.bauer@ctu.gov");
				Player p2 = new Player("Chloe O'Brian", "c.obrian@ctu.gov");
				Player p3 = new Player("Kim Bauer", "kim_bauer@gmail.com");
				Player p4 = new Player("David Palmer", "david.palmer@gmail.com");
				Player p5 = new Player("Michelle Dessler", "m.dessler@gmail.com");
				repository.save(p1);
				repository.save(p2);
				repository.save(p3);
				repository.save(p4);
//				repository.save(p5);


				Game g1 = new Game();
				Game g2 = new Game();
//				Game g3 = new Game();
				gameRep.save(g1);
				gameRep.save(g2);
//				gameRep.save(g3);

				gamePlayerRep.save(new GamePlayer(p1, g1));
				gamePlayerRep.save(new GamePlayer(p2, g1));
				gamePlayerRep.save(new GamePlayer(p3, g2));
				gamePlayerRep.save(new GamePlayer(p4, g2));

				ArrayList<String> destroyer = new ArrayList<String>();
				destroyer.add("A1");
				destroyer.add("B1");

				ArrayList<String> cruiser = new ArrayList<String>();
				cruiser.add("C1");
				cruiser.add("D1");

				ArrayList<String> battleship = new ArrayList<String>();
				battleship.add("E1");
				battleship.add("F1");

				ArrayList<String> boat = new ArrayList<String>();
				boat.add("G1");
				boat.add("H1");

				Ship s1 = new Ship("destroyer", destroyer);
				Ship s2 = new Ship("cruiser", cruiser);
				Ship s3 = new Ship("battleship", battleship);
				Ship s4 = new Ship("boat", boat);

				shipRep.save(s1);
				shipRep.save(s2);
				shipRep.save(s3);
				shipRep.save(s4);
				};
		}
	}


