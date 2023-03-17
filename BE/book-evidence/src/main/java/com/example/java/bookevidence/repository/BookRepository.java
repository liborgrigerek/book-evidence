package com.example.java.bookevidence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.java.bookevidence.model.Book;

/**
 * Book Repository.
 * 
 * @author Libor Grigerek
 *
 */

public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query("SELECT b FROM Book b WHERE b.reader IS NOT NULL")
    List<Book> findRentedBooks();
    
}
