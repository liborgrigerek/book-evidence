package com.example.java.bookevidence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.java.bookevidence.model.Author;

/**
 * Author Repository.
 * 
 * @author Libor Grigerek
 */

public interface AuthorRepository extends JpaRepository<Author, Integer> {
    
}
