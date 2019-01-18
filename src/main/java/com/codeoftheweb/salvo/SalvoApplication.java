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
		public CommandLineRunner initData (PlayerRepository repository, GameRepository gameRep, GamePlayerRepository gamePlayerRep, ShipRepository shipRep, SalvoRepository salvoRep) {
			return (args) -> {
				// Players
				Player p1 = new Player("Jack Bauer", "j.bauer@ctu.gov");
				Player p2 = new Player("Chloe O'Brian", "c.obrian@ctu.gov");
				Player p3 = new Player("Kim Bauer", "kim_bauer@gmail.com");
				Player p4 = new Player("Tony Almeida", "t.almeida@ctu.gov");
				//Saved Players
				repository.save(p1);
				repository.save(p2);
				repository.save(p3);
				repository.save(p4);
				//Games
				Game g1 = new Game();
				Game g2 = new Game();
				Game g3 = new Game();
				Game g4 = new Game();
				Game g5 = new Game();
				Game g6 = new Game();
				Game g7 = new Game();
				Game g8 = new Game();
				//Saved Games
				gameRep.save(g1);
				gameRep.save(g2);
				gameRep.save(g3);
				gameRep.save(g4);
				gameRep.save(g5);
				gameRep.save(g6);
				gameRep.save(g7);
				gameRep.save(g8);

				//Game #1 ----------------------------------------------------------------------------------------------
				//GPlayer #1 J.Bauer - ships
				ArrayList<String> Destroyer1 = new ArrayList<String>();
				Destroyer1.add("H2");
				Destroyer1.add("H3");
				Destroyer1.add("H4");
				ArrayList<String> Submarine1 = new ArrayList<String>();
				Submarine1.add("E1");
				Submarine1.add("F1");
				Submarine1.add("G1");
				ArrayList<String> PatrolBoat1 = new ArrayList<String>();
				PatrolBoat1.add("B4");
				PatrolBoat1.add("B5");

				//GPlayer #1 J.Bauer - salvoes
				ArrayList<String> Salvo1 = new ArrayList<String>();
				Salvo1.add("B5");
				ArrayList<String> Salvo3 = new ArrayList<String>();
				Salvo3.add("F2");

				//GPlayer #2 C.Obrian- ships
				ArrayList<String> Destroyer2 = new ArrayList<String>();
				Destroyer2.add("B5");
				Destroyer2.add("C5");
				Destroyer2.add("D5");
				ArrayList<String> PatrolBoat2 = new ArrayList<String>();
				PatrolBoat2.add("F1");
				PatrolBoat2.add("F2");

				//GPlayer #2 C.Obrian- salvoes
				ArrayList<String> Salvo2 = new ArrayList<String>();
				Salvo2.add("B5");
				ArrayList<String> Salvo4 = new ArrayList<String>();
				Salvo4.add("E1");

				//GPlayer#1 - New Ships
				Ship s1 = new Ship("destroyer", Destroyer1);
				Ship s2 = new Ship("submarine", Submarine1);
				Ship s3 = new Ship("patrolBoat", PatrolBoat1);
				//GPlayer#2 - New Ships
				Ship s4 = new Ship("destroyer", Destroyer2);
				Ship s5 = new Ship("patrolBoat", PatrolBoat2);

				//GPlayer #1 - Ships added
				GamePlayer gp1 = new GamePlayer(p1, g1);
				gp1.addShip(s1);
				gp1.addShip(s2);
				gp1.addShip(s3);

				//GPlayer#1 - New Salvo
				Salvo sS1 = new Salvo(1, gp1, Salvo1);
				Salvo sS3 = new Salvo(2, gp1, Salvo3);
				//GPlayer #1 - Salvoes added
				gp1.addSalvo(sS1);
				gp1.addSalvo(sS3);

				//GPlayer #2 - Ships added
				GamePlayer gp2 = new GamePlayer(p2, g1);
				gp2.addShip(s4);
				gp2.addShip(s5);

				//GPlayer#2 - New Salvo
				Salvo sS2 = new Salvo(1, gp2, Salvo2);
				Salvo sS4 = new Salvo(2, gp2, Salvo4);
				//GPlayer #2 - Salvoes added
				gp2.addSalvo(sS2);
				gp2.addSalvo(sS4);

				//Saved GPlayers - Game #1
				gamePlayerRep.save(gp1);
				gamePlayerRep.save(gp2);

				//Saved Salvos - Game #1
				salvoRep.save(sS1);
				salvoRep.save(sS2);
				salvoRep.save(sS3);
				salvoRep.save(sS4);

				//Saved ships Game #1
				shipRep.save(s1);
				shipRep.save(s2);
				shipRep.save(s3);
				shipRep.save(s4);
				shipRep.save(s5);


				//Game #2 ----------------------------------------------------------------------------------------------
				//Player #1 J.Bauer - ships
				ArrayList<String> Destroyer3 = new ArrayList<String>();
				Destroyer3.add("B5");
				Destroyer3.add("C5");
				Destroyer3.add("D5");
				ArrayList<String> PatrolBoat3 = new ArrayList<String>();
				PatrolBoat3.add("C6");
				PatrolBoat3.add("C7");
				//Player #2 C.Obrian- ships
				ArrayList<String> Submarine4 = new ArrayList<String>();
				Submarine4.add("A2");
				Submarine4.add("A3");
				Submarine4.add("A4");
				ArrayList<String> PatrolBoat4 = new ArrayList<String>();
				PatrolBoat4.add("G6");
				PatrolBoat4.add("H6");
				//GPlayer#1 - New Ships
				Ship s6 = new Ship("destroyer", Destroyer3);
				Ship s7 = new Ship("patrolBoat", PatrolBoat3);
				//GPlayer#2 - New Ships
				Ship s8 = new Ship("submarine", Submarine4);
				Ship s9 = new Ship("patrolBoat", PatrolBoat4);
				//GPlayer #1
				GamePlayer gp3 = new GamePlayer(p1, g2);
				gp3.addShip(s6);
				gp3.addShip(s7);
				//GPlayer #2
				GamePlayer gp4 = new GamePlayer(p2, g2);
				gp4.addShip(s8);
				gp4.addShip(s9);
				//Saved GPlayers - Game #2
				gamePlayerRep.save(gp3);
				gamePlayerRep.save(gp4);
				//Saved Ships Game #2
				shipRep.save(s6);
				shipRep.save(s7);
				shipRep.save(s8);
				shipRep.save(s9);

				//Game #3 ----------------------------------------------------------------------------------------------
				//Player #1 C.Obrian - ships
				ArrayList<String> Destroyer5 = new ArrayList<String>();
				Destroyer5.add("B5");
				Destroyer5.add("C5");
				Destroyer5.add("D5");
				ArrayList<String> PatrolBoat5 = new ArrayList<String>();
				PatrolBoat5.add("C6");
				PatrolBoat5.add("C7");
				//Player #2 T.Almeida - ships
				ArrayList<String> Submarine6 = new ArrayList<String>();
				Submarine6.add("A2");
				Submarine6.add("A3");
				Submarine6.add("A4");
				ArrayList<String> PatrolBoat6 = new ArrayList<String>();
				PatrolBoat6.add("G6");
				PatrolBoat6.add("H6");
				//GPlayer#1 - New Ships
				Ship s10 = new Ship("destroyer", Destroyer5);
				Ship s11 = new Ship("patrolBoat", PatrolBoat5);
				//GPlayer#2 - New Ships
				Ship s12 = new Ship("submarine", Submarine6);
				Ship s13 = new Ship("patrolBoat", PatrolBoat6);
				//GPlayer #1
				GamePlayer gp5 = new GamePlayer(p2, g3);
				gp5.addShip(s10);
				gp5.addShip(s11);
				//GPlayer #2
				GamePlayer gp6 = new GamePlayer(p4, g3);
				gp6.addShip(s12);
				gp6.addShip(s13);
				//Saved GPlayers Game #3
				gamePlayerRep.save(gp5);
				gamePlayerRep.save(gp6);
				//Saved Ships Game #3
				shipRep.save(s10);
				shipRep.save(s11);
				shipRep.save(s12);
				shipRep.save(s13);

				//Game #4 ----------------------------------------------------------------------------------------------
				//Player #1 C.Obrian - ships
				ArrayList<String> Destroyer7 = new ArrayList<String>();
				Destroyer7.add("B5");
				Destroyer7.add("C5");
				Destroyer7.add("D5");
				ArrayList<String> PatrolBoat7 = new ArrayList<String>();
				PatrolBoat7.add("C6");
				PatrolBoat7.add("C7");
				//Player #2 J.Bauer - ships
				ArrayList<String> Submarine8 = new ArrayList<String>();
				Submarine8.add("A2");
				Submarine8.add("A3");
				Submarine8.add("A4");
				ArrayList<String> PatrolBoat8 = new ArrayList<String>();
				PatrolBoat8.add("G6");
				PatrolBoat8.add("H6");
				//GPlayer#1 - New Ships
				Ship s14 = new Ship("destroyer", Destroyer7);
				Ship s15 = new Ship("patrolBoat", PatrolBoat7);
				//GPlayer#2 - New Ships
				Ship s16 = new Ship("submarine", Submarine8);
				Ship s17 = new Ship("patrolBoat", PatrolBoat8);
				//GPlayer #1
				GamePlayer gp7 = new GamePlayer(p2, g4);
				gp7.addShip(s14);
				gp7.addShip(s15);
				//GPlayer #2
				GamePlayer gp8 = new GamePlayer(p1, g4);
				gp8.addShip(s16);
				gp8.addShip(s17);
				//Saved GPlayers
				gamePlayerRep.save(gp7);
				gamePlayerRep.save(gp8);
				//Saved Ships
				shipRep.save(s14);
				shipRep.save(s13);
				shipRep.save(s15);
				shipRep.save(s16);

				//Game #5 --------------------------------------------------------------------------------------------
				//Player #1 T.Almeida - ships
				ArrayList<String> Destroyer9 = new ArrayList<String>();
				Destroyer9.add("B5");
				Destroyer9.add("C5");
				Destroyer9.add("D5");
				ArrayList<String> PatrolBoat9 = new ArrayList<String>();
				PatrolBoat9.add("C6");
				PatrolBoat9.add("C7");
				//Player #2 J.Bauer - ships
				ArrayList<String> Submarine10 = new ArrayList<String>();
				Submarine10.add("A2");
				Submarine10.add("A3");
				Submarine10.add("A4");
				ArrayList<String> PatrolBoat10 = new ArrayList<String>();
				PatrolBoat10.add("G6");
				PatrolBoat10.add("H6");
				//GPlayer#1 - New Ships
				Ship s18 = new Ship("destroyer", Destroyer9);
				Ship s19 = new Ship("patrolBoat", PatrolBoat9);
				//GPlayer#2 - New Ships
				Ship s20 = new Ship("submarine", Submarine10);
				Ship s21 = new Ship("patrolBoat", PatrolBoat10);
				//GPlayer #1
				GamePlayer gp9 = new GamePlayer(p4, g5);
				gp9.addShip(s18);
				gp9.addShip(s19);
				//GPlayer #2
				GamePlayer gp10 = new GamePlayer(p1, g5);
				gp10.addShip(s20);
				gp10.addShip(s21);
				//Saved GPlayers
				gamePlayerRep.save(gp9);
				gamePlayerRep.save(gp10);
				//Saved Ships
				shipRep.save(s18);
				shipRep.save(s19);
				shipRep.save(s20);
				shipRep.save(s21);

				//Game #6 ----------------------------------------------------------------------------------------------
				//Player #1 K.Bauer - ships
				ArrayList<String> Destroyer11 = new ArrayList<String>();
				Destroyer11.add("B5");
				Destroyer11.add("C5");
				Destroyer11.add("D5");
				ArrayList<String> PatrolBoat11 = new ArrayList<String>();
				PatrolBoat11.add("C6");
				PatrolBoat11.add("C7");
				//No Player #2

				//GPlayer#1 - New Ships
				Ship s22 = new Ship("destroyer", Destroyer11);
				Ship s23 = new Ship("patrolBoat", PatrolBoat11);
				//No GPlayer#2 - New Ships

				//GPlayer #1
				GamePlayer gp11 = new GamePlayer(p3, g6);
				gp11.addShip(s22);
				gp11.addShip(s23);
				//No GPlayer #2

				//Saved GPlayers
				gamePlayerRep.save(gp11);
				//Saved Ships
				shipRep.save(s22);
				shipRep.save(s23);

				//Game #7 - Has 1 gamePlayer but no ships played ----------------------------------------------------------------------------------------------
				//Player #1 T.Almeida
				GamePlayer gp12 = new GamePlayer(p4, g7);
				gamePlayerRep.save(gp12);
				//Game #8 -----------------------------------------------------------------------------------------------------------
				//Player #1 K.Bauer - ships
				ArrayList<String> Destroyer12 = new ArrayList<String>();
				Destroyer12.add("B5");
				Destroyer12.add("C5");
				Destroyer12.add("D5");
				ArrayList<String> PatrolBoat12 = new ArrayList<String>();
				PatrolBoat12.add("C6");
				PatrolBoat12.add("C7");
				//Player #2 T.Almeida- ships
				ArrayList<String> Submarine13 = new ArrayList<String>();
				Submarine13.add("A2");
				Submarine13.add("A3");
				Submarine13.add("A4");
				ArrayList<String> PatrolBoat13 = new ArrayList<String>();
				PatrolBoat13.add("G6");
				PatrolBoat13.add("H6");
				//GPlayer#1 - New Ships
				Ship s24 = new Ship("destroyer", Destroyer12);
				Ship s25 = new Ship("patrolBoat", PatrolBoat12);
				//GPlayer#2 - New Ships
				Ship s26 = new Ship("submarine", Submarine13);
				Ship s27 = new Ship("patrolBoat", PatrolBoat13);
				//GPlayer #1
				GamePlayer gp13 = new GamePlayer(p3, g8);
				gp13.addShip(s24);
				gp13.addShip(s25);
				//GPlayer #2
				GamePlayer gp14 = new GamePlayer(p4, g8);
				gp14.addShip(s26);
				gp14.addShip(s27);
				//Saved GPlayers
				gamePlayerRep.save(gp13);
				gamePlayerRep.save(gp14);
				//Saved Ships
				shipRep.save(s24);
				shipRep.save(s25);
				shipRep.save(s26);
				shipRep.save(s27);
			};
		}
	}


