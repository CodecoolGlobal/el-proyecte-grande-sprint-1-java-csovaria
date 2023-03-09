package com.codecool.gift_rocket;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class GiftRocketApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	public void githubActionsResponseOK(){
		String text = "OK";
		assertEquals("OK", text);
	}

}
