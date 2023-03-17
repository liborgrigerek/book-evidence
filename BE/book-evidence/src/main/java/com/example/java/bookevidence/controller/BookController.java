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

import com.example.java.bookevidence.model.Book;
import com.example.java.bookevidence.service.BookService;
import com.example.java.bookevidence.util.CommonUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


/**
 * Book Controller.
 * 
 * @author Libor Grigerek
 *
 */

@RestController
@RequestMapping(path = CommonUtil.BOOK_URL)
public class BookController {
    // logger 
    private static final Logger log = LoggerFactory.getLogger(BookController.class);
    
    // services
    private final BookService bookService;    
    
    /**
     * Constructor.
     * @param bookService book service.
     */
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }


    /**
     * Returns all stored books.
     * @return all stored books.
     */
    @GetMapping(value = "all")
    public ResponseEntity<List<Book>> getAllBooks() {
       log.debug("getAllBooks() started.");
       try {
           List<Book> allBooks = bookService.getAllBooks();
           log.debug("allBooks={}", allBooks);
           return ResponseEntity.ok(allBooks);
       } catch (Exception ex) {
           log.error("getAllBooks() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Returns all rented books.
     * @return all rented books.
     */
    @GetMapping(value = "rentedbooks")
    public ResponseEntity<List<Book>> getRentedBooks() {
       log.debug("getRentedBooks() started.");
       try {
           List<Book> rentedBooks = bookService.getRentedBooks();
           log.debug("rentedBooks={}", rentedBooks);
           return ResponseEntity.ok(rentedBooks);
       } catch (Exception ex) {
           log.error("getRentedBooks() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Returns book by its id.
     * @return book by its id.
     */
    @GetMapping(value = "findbyid")
    public ResponseEntity<Book> getBookById(@RequestParam("id") Integer id) {
       log.debug("getBookById({}) started.", id);
       try {
           Book book = bookService.getBookById(id);
           log.debug("book={}", book);
           return ResponseEntity.ok(book);
       } catch (Exception ex) {
           log.error("getBookById({}) error: {}", id, ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Saves given book to the database.
     * @param book book.
     * @return saved entity.
     */
    @PostMapping(value="save")
    public ResponseEntity<Book> saveBook(@RequestBody Book book) {
        log.debug("saveBook() started. Book={}", book);
        try {
            Book savedBook = bookService.saveBook(book);
            log.debug("saveBook() finished. savedBook={}", savedBook);
            return ResponseEntity.ok(savedBook);
       } catch (Exception ex) {
           log.error("saveBook() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Deletes given book from the database.
     * @param bookId id of book.
     * @return true if successfully deleted.
     */
    @DeleteMapping(value="delete")
    public ResponseEntity<Boolean> deleteBook(@RequestParam("id") Integer bookId) {
        log.debug("deleteBook() started. bookId={}", bookId);
        try {
            bookService.deleteBookById(bookId);
            log.debug("deleteBook() finished successfully.");
            return ResponseEntity.ok(true);
       } catch (Exception ex) {
           log.error("deleteBook() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }
    
    

}
