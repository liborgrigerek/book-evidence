package com.example.java.bookevidence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.java.bookevidence.model.Book;

/**
 * Book Repository.
 * 
 * @author Libor Grigerek
 *
 */

public interface BookRepository extends JpaRepository<Book, Integer> {
    
}
