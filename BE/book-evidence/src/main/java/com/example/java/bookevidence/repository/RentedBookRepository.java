package com.example.java.bookevidence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.java.bookevidence.model.RentedBook;

/**
 * RentedBook repository.
 * @author Libor Grigerek
 *
 */

public interface RentedBookRepository extends JpaRepository<RentedBook, RentedBook.Key> {

    @Query("SELECT rb FROM RentedBook rb WHERE rb.key.readerId = :readerId")
    List<RentedBook> findByReaderId(@Param("readerId") Integer readerId);

    @Query("SELECT rb FROM RentedBook rb WHERE rb.key.bookId = :bookId")
    List<RentedBook> findByBookId(@Param("bookId") Integer bookId);

}
