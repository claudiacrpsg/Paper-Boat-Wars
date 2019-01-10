package com.codeoftheweb.salvo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.*;

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

				Game g1 = new Game();
				Game g2 = new Game();

				gameRep.save(g1);
				gameRep.save(g2);


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

				Ship s5 = new Ship("destroyer", destroyer);
				Ship s6 = new Ship("cruiser", cruiser);
				Ship s7 = new Ship("battleship", battleship);
				Ship s8 = new Ship("boat", boat);


				GamePlayer gp1 = new GamePlayer(p1, g1);
				gp1.addShip(s1);
				gp1.addShip(s2);
				gp1.addShip(s3);
				gp1.addShip(s4);
				GamePlayer gp2 = new GamePlayer(p2, g1);
				gp2.addShip(s5);
				gp2.addShip(s6);
				gp2.addShip(s7);
				gp2.addShip(s8);
				GamePlayer gp3 = new GamePlayer(p3, g2);
				gp3.addShip(s1);
				gp3.addShip(s2);
				gp3.addShip(s3);
				gp3.addShip(s4);
				GamePlayer gp4 = new GamePlayer(p4, g2);
				gp4.addShip(s1);
				gp4.addShip(s2);
				gp4.addShip(s3);
				gp4.addShip(s4);

				gamePlayerRep.save(gp1);
				gamePlayerRep.save(gp2);
				gamePlayerRep.save(gp3);
				gamePlayerRep.save(gp4);

				shipRep.save(s1);
				shipRep.save(s2);
				shipRep.save(s3);
				shipRep.save(s4);
				shipRep.save(s5);
				shipRep.save(s6);
				shipRep.save(s7);
				shipRep.save(s8);

				};
		}
	}


