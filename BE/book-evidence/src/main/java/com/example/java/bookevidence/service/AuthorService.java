package com.example.java.bookevidence.service;

import java.util.List;

import com.example.java.bookevidence.model.Author;

/**
 * Author Service.
 * 
 * @author Libor Grigerek
 *
 */

public interface AuthorService {
    List<Author> getAllAuthors();
    Author getAuthorById(Integer id);
}
