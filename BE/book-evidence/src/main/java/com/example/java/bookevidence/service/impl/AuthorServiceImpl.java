package com.example.java.bookevidence.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.java.bookevidence.model.Author;
import com.example.java.bookevidence.repository.AuthorRepository;
import com.example.java.bookevidence.service.AuthorService;

/**
 * Implementation of Author Service.
 * 
 * @author Libor Grigerek
 *
 */

@Service
public class AuthorServiceImpl implements AuthorService {
    // logger 
    private static final Logger log = LoggerFactory.getLogger(AuthorServiceImpl.class);
    
    // repositories
    private final AuthorRepository authorRepository;
    
    
    /**
     * Constructor.
     * @param authorRepository author repository.
     */
    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    /**
     * Returns all authors.
     * @return all authors.
     */
    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    /**
     * Returns author by id.
     * @return author by id.
     */
    @Override
    public Author getAuthorById(Integer id) {
        return authorRepository.findById(id).orElse(null);
    }

}
