package roll;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class Roll20Test {
	
	Roll20 d4;
	Roll20 d6;
	Roll20 d8;
	Roll20 d10;
	Roll20 d12;
	Roll20 d20;

	@BeforeEach
	void setUp() throws Exception {
		d4 = new Roll20();
		d6 = new Roll20();
		d8 = new Roll20();
		d10 = new Roll20();
		d12 = new Roll20();
		d20 = new Roll20();
	}

	@AfterEach
	void tearDown() throws Exception {
		d4 = null;
		d6 = null;
		d8 = null;
		d10 = null;
		d12 = null;
		d20 = null;
	}

	@Test
	void testRolling() {
		d4.rollD4(1);
		//System.out.println(d4.getRoll());
		d6.rollD6(2);
		// System.out.println("\n" + d6.getRoll());
		int count = 5;
		while(count != 0) {
			d20.rollD20(1);
			System.out.println(d20.getRoll());
			count--;
		}
	}

}
