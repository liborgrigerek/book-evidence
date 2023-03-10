package com.example.java.bookevidence.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.java.bookevidence.model.Author;
import com.example.java.bookevidence.service.AuthorService;
import com.example.java.bookevidence.util.CommonUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


/**
 * Author Controller.
 * 
 * @author Libor Grigerek
 *
 */

@RestController
@RequestMapping(path = CommonUtil.AUTHOR_URL)
public class AuthorController {
    // logger 
    private static final Logger log = LoggerFactory.getLogger(AuthorController.class);
    
    // services
    private final AuthorService authorService;    
    
    /**
     * Constructor.
     * @param authorService author service.
     */
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }


    /**
     * Returns all stored authors.
     * @return all stored authors.
     */
    @GetMapping(value = "all")
    public ResponseEntity<List<Author>> getAllAuthors() {
       log.debug("getAllAuthors() started.");
       try {
           List<Author> allAuthors = authorService.getAllAuthors();
           log.debug("allAuthors={}", allAuthors);
           return ResponseEntity.ok(allAuthors);
       } catch (Exception ex) {
           log.error("getAllAuthors() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Returns author by his id.
     * @return author by his id.
     */
    @GetMapping(value = "findbyid")
    public ResponseEntity<Author> getAuthorById(@RequestParam("id") Integer id) {
       log.debug("getAuthorById({}) started.", id);
       try {
           Author author = authorService.getAuthorById(id);
           log.debug("author={}", author);
           return ResponseEntity.ok(author);
       } catch (Exception ex) {
           log.error("getAuthorById({}) error: {}", id, ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Saves given author to the database.
     * @param author author.
     * @return saved entity.
     */
    @PostMapping(value="save")
    public ResponseEntity<Author> saveAuthor(@RequestBody Author author) {
        log.debug("saveAuthor() started. Author={}", author);
        try {
            Author savedAuthor = authorService.saveAuthor(author);
            log.debug("saveAuthor() finished. savedAuthor={}", savedAuthor);
            return ResponseEntity.ok(savedAuthor);
       } catch (Exception ex) {
           log.error("saveAuthor() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Deletes given author from the database.
     * @param authorId id of author.
     * @return true if successfully deleted.
     */
    @DeleteMapping(value="delete")
    public ResponseEntity<Boolean> deleteAuthor(@RequestParam("id") Integer authorId) {
        log.debug("deleteAuthor() started. authorId={}", authorId);
        try {
            authorService.deleteAuthorById(authorId);
            log.debug("deleteAuthor() finished successfully.");
            return ResponseEntity.ok(true);
       } catch (Exception ex) {
           log.error("deleteAuthor() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }
    
    

}
