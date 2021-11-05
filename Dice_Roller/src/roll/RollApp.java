package roll;

import java.util.Scanner;

public class RollApp {

	public static void main(String[] args) {
		
		Roll20 genaricDice = new Roll20();
		int answer;
		int count = 3;
		
		while(count != 0) {
			System.out.println("What dice would you like to roll?");
			System.out.println("** A D4? **");
			System.out.println("** A D6? **");
			System.out.println("** A D8? **");
			System.out.println("** A D10? **");
			System.out.println("** A D12? **");
			System.out.println("** A D20? **");
			
			Scanner diceInput = new Scanner(System.in);
			String diceResponse = diceInput.nextLine();
			
			System.out.println("How many rolls would you like?");
			
			Scanner rollInput = new Scanner(System.in);
			String rollResponse = rollInput.nextLine();
			int intResponse = Integer.parseInt(rollResponse);
			
			if(diceResponse.equals("D4") || diceResponse.equals("d4")) {
				genaricDice.rollD4(intResponse);
				answer = genaricDice.getRoll();
				System.out.println("Your rolls add up to: " + answer + "\r\n");
			} else if(diceResponse.equals("D6") || diceResponse.equals("d6")) {
				genaricDice.rollD6(intResponse);
				answer = genaricDice.getRoll();
				System.out.println("Your rolls add up to: " + answer + "\r\n");
			} else if(diceResponse.equals("D8") || diceResponse.equals("d8")) {
				genaricDice.rollD8(intResponse);
				answer = genaricDice.getRoll();
				System.out.println("Your rolls add up to: " + answer + "\r\n");
			} else if(diceResponse.equals("D10") || diceResponse.equals("d10")) {
				genaricDice.rollD10(intResponse);
				answer = genaricDice.getRoll();
				System.out.println("Your rolls add up to: " + answer + "\r\n");
			} else if(diceResponse.equals("D12") || diceResponse.equals("d12")) {
				genaricDice.rollD12(intResponse);
				answer = genaricDice.getRoll();
				System.out.println("Your rolls add up to: " + answer + "\r\n");
			} else if(diceResponse.equals("D20") || diceResponse.equals("d20")) {
				genaricDice.rollD20(intResponse);
				answer = genaricDice.getRoll();
				System.out.println("Your rolls add up to: " + answer + "\r\n");
			} else {
				System.out.println("Please either enter a type of dice to roll, and/or the ammount of rolls.\r\n");
			}
			count--;
		}
	}
}
