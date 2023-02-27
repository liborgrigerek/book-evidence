package com.example.java.bookevidence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.java.bookevidence.model.RentedBook;

/**
 * RentedBook repository.
 * @author Libor Grigerek
 *
 */

public interface RentedBookRepository extends JpaRepository<RentedBook, RentedBook.Key> {

}
