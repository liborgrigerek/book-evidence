package com.example.java.bookevidence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.java.bookevidence.model.Reader;

/**
 * Reader Repository.
 * @author Libor Grigerek
 *
 */

public interface ReaderRepository extends JpaRepository<Reader, Integer> {

}
