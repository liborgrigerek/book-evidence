package com.example.java.bookevidence.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.java.bookevidence.model.RentedBook;
import com.example.java.bookevidence.repository.RentedBookRepository;
import com.example.java.bookevidence.service.RentedBookService;

/**
 * Implementation of RentedBook Service.
 * 
 * @author Libor Grigerek
 *
 */

@Service
public class RentedBookServiceImpl implements RentedBookService {
    // logger 
    private static final Logger log = LoggerFactory.getLogger(RentedBookServiceImpl.class);
    
    // repositories
    private final RentedBookRepository rentedBookRepository;
    
    /**
     * Constructor.
     * @param rentedBookRepository rented book repository.
     */
    public RentedBookServiceImpl(RentedBookRepository rentedBookRepository) {
        this.rentedBookRepository = rentedBookRepository;
    }

    /**
     * Returns all rented books.
     * @return all rented books.
     */
    @Override
    public List<RentedBook> getAllRentedBooks() {
        return rentedBookRepository.findAll();
    }

    /**
     * Returns rented book by a key.
     * @param bookId id of a book.
     * @param readerId id of a reader.
     * @return rented books by reader.
     */
    @Override
    public RentedBook getRentedBookByKey(Integer bookId, Integer readerId) {
        RentedBook.Key key = new RentedBook.Key(bookId, readerId);
        return rentedBookRepository.findById(key).orElse(null);
    }

    /**
     * Returns rented books by a reader.
     * @param readerId id of a reader.
     * @return rented books by reader.
     */
    @Override
    public List<RentedBook> getRentedBooksByReader(Integer readerId) {
        return rentedBookRepository.findByReaderId(readerId);
    }

    /**
     * Returns rented books by a book.
     * @param bookId id of a book.
     * @return rented books by a book.
     */
    @Override
    public List<RentedBook> getRentedBooksByBook(Integer bookId) {
        return rentedBookRepository.findByBookId(bookId);
    }

    /**
     * Saves given rented book.
     * @return saved entity.
     */
    @Override
    public RentedBook saveRentedBook(RentedBook rentedBook) {
        return rentedBookRepository.save(rentedBook);
    }

    /**
     * Deletes given rented book.
     * @param bookId id of book.
     * @param readerId id of reader.
     */
    @Override
    public void deleteRentedBookByKey(Integer bookId, Integer readerId) {
        RentedBook.Key key = new RentedBook.Key(bookId, readerId);
        rentedBookRepository.deleteById(key);
    }

}
