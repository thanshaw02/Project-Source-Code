package roll;

public class Roll20 {
	
	private static String diceType;
	private static int rollNumber;
	
	public Roll20() {
		
	}
	
	private static int numberOfRolls(int aRoll, int type) {
		int random = (int)(Math.random() * type) + 1;
		if(aRoll < 1) {
			return 0;
		} else {
			System.out.println(random);
			return random + numberOfRolls(aRoll - 1, type);
		}
	}
	
	public void rollD4(int aRoll) {
		rollNumber = Roll20.numberOfRolls(aRoll, 4);
	}
	
	public void rollD6(int aRoll) {
		rollNumber = Roll20.numberOfRolls(aRoll, 6);
	}
	
	public void rollD8(int aRoll) {
		rollNumber = Roll20.numberOfRolls(aRoll, 8);
	}
	
	public void rollD10(int aRoll) {
		rollNumber = Roll20.numberOfRolls(aRoll, 10);
	}
	
	public void rollD12(int aRoll) {
		rollNumber = Roll20.numberOfRolls(aRoll, 12);
	}
	
	public void rollD20(int aRoll) {
		rollNumber = Roll20.numberOfRolls(aRoll, 20);
	}
	
	public int getRoll() {
		return rollNumber;
	}

}
