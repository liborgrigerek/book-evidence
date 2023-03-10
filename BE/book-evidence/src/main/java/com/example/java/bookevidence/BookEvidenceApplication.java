package com.example.java.bookevidence;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*
 * This is an example of application that demonstrates using of:
 * - BE: SpringBoot, JPA, Hibernate, H2
 * - FE: TypeScript (Angular), Angular-Material-Design, JavaScript, CSS
 * - OAuth2 authentication / authorization
 * - Maven, Git / GitHub
 * 
 * TODO:
 *  - FIXME: one reader can borrow the same book twice
 *  - IMPLEMENT: FE: DatePickers for rentedWhen and rentedUntil
 *  - IMPLEMENT: list of rentBooks for selected Reader
 *               list of readers of selected book.
 * 
 * @author Libor Grigerek
 */

@SpringBootApplication
public class BookEvidenceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookEvidenceApplication.class, args);
	}

}
