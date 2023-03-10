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

import com.example.java.bookevidence.model.RentedBook;
import com.example.java.bookevidence.service.RentedBookService;
import com.example.java.bookevidence.util.CommonUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


/**
 * RentedBook Controller.
 * 
 * @author Libor Grigerek
 *
 */

@RestController
@RequestMapping(path = CommonUtil.RENTEDBOOK_URL)
public class RentedBookController {
    // logger 
    private static final Logger log = LoggerFactory.getLogger(RentedBookController.class);
    
    // services
    private final RentedBookService rentedBookService;    
    
    /**
     * Constructor.
     * @param rentedBookService rented book service.
     */
    public RentedBookController(RentedBookService rentedBookService) {
        this.rentedBookService = rentedBookService;
    }

    /**
     * Returns all rented books.
     * @return all rented books.
     */
    @GetMapping(value = "all")
    public ResponseEntity<List<RentedBook>> getAllRentedBooks() {
       log.debug("getAllRentedBooks() started.");
       try {
           List<RentedBook> allRentedBooks = rentedBookService.getAllRentedBooks();
           log.debug("allRentedBooks={}", allRentedBooks);
           return ResponseEntity.ok(allRentedBooks);
       } catch (Exception ex) {
           log.error("getAllRentedBooks() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Returns rented book by its key.
     * @param bookId id of a book.
     * @param readerId id of a reader.
     * @return rented book by its key.
     */
    @GetMapping(value = "findbykey")
    public ResponseEntity<RentedBook> getRentedBookByKey(@RequestParam("bookid") Integer bookId, @RequestParam("readerid") Integer readerId) {
       log.debug("getRentedBookByKey() started. BookId={}, readerId={}", bookId, readerId);
       try {
           RentedBook rentedBook = rentedBookService.getRentedBookByKey(bookId, readerId);
           log.debug("rentedBook={}", rentedBook);
           return ResponseEntity.ok(rentedBook);
       } catch (Exception ex) {
           log.error("getRentedBookByKey() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Returns rented books by book.
     * @param bookId id of a book.
     * @return rented books.
     */
    @GetMapping(value = "findbybook")
    public ResponseEntity<List<RentedBook>> findRentedBooksByBook(@RequestParam("bookid") Integer bookId) {
       log.debug("getRentedBookByBook() started. BookId={}", bookId);
       try {
           List<RentedBook> rentedBooks = rentedBookService.getRentedBooksByBook(bookId);
           log.debug("rentedBooks={}", rentedBooks);
           return ResponseEntity.ok(rentedBooks);
       } catch (Exception ex) {
           log.error("getRentedBooksByBook() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Returns rented books by reader.
     * @param readerId id of a reader.
     * @return rented books.
     */
    @GetMapping(value = "findbyreader")
    public ResponseEntity<List<RentedBook>> findRentedBooksByReader(@RequestParam("readerid") Integer readerId) {
       log.debug("getRentedBookByReader() started. ReaderId={}", readerId);
       try {
           List<RentedBook> rentedBooks = rentedBookService.getRentedBooksByReader(readerId);
           log.debug("rentedBooks={}", rentedBooks);
           return ResponseEntity.ok(rentedBooks);
       } catch (Exception ex) {
           log.error("getRentedBooksByReader() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Saves given rented book to the database.
     * @param rentedBook rented book.
     * @return saved entity.
     */
    @PostMapping(value="save")
    public ResponseEntity<RentedBook> saveRentedBook(@RequestBody RentedBook rentedBook) {
        // key is not transferred. Create it.
        rentedBook.setKey(new RentedBook.Key(rentedBook.getBook().getId(), rentedBook.getReader().getId()));
        log.debug("saveRentedBook() started. RentedBook={}", rentedBook);
        try {
            RentedBook savedRentedBook = rentedBookService.saveRentedBook(rentedBook);
            log.debug("saveRentedBook() finished. savedRentedBook={}", savedRentedBook);
            return ResponseEntity.ok(savedRentedBook);
       } catch (Exception ex) {
           log.error("saveRentedBook() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Deletes given rented book from the database.
     * @param bookId id of a book.
     * @param readerId id of a reader.
     * @return true if successfully deleted.
     */
    @DeleteMapping(value="delete")
    public ResponseEntity<Boolean> deleteRentedBook(@RequestParam("bookid") Integer bookId, @RequestParam("readerid") Integer readerId) {
        log.debug("deleteRentedBook() started. BookId={}, readerId={}", bookId, readerId);
        try {
            rentedBookService.deleteRentedBookByKey(bookId, readerId);
            log.debug("deleteRentedBook() finished successfully.");
            return ResponseEntity.ok(true);
       } catch (Exception ex) {
           log.error("deleteRentedBook() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }
}
