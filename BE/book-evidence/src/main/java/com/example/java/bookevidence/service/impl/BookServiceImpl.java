package com.example.java.bookevidence.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.java.bookevidence.model.Book;
import com.example.java.bookevidence.repository.BookRepository;
import com.example.java.bookevidence.service.BookService;

/**
 * Implementation of Book Service.
 * 
 * @author Libor Grigerek
 *
 */

@Service
public class BookServiceImpl implements BookService {
    // logger 
    private static final Logger log = LoggerFactory.getLogger(BookServiceImpl.class);

    // repositories
    private final BookRepository bookRepository;

    /**
     * Constructor.
     * @param bookRepository book repository.
     */
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * Returns all books.
     * @return all books.
     */
    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    /**
     * Returns rented books.
     * @return rented books.
     */
    @Override
    public List<Book> getRentedBooks() {
        return bookRepository.findRentedBooks();
    }

    /**
     * Returns book by id.
     * @return book by id.
     */
    @Override
    public Book getBookById(Integer id) {
        return bookRepository.findById(id).orElse(null);
    }

    /**
     * Saves given book.
     * @return
     */
    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    /**
     * Deletes given book.
     * @param bookId id of book.
     */
    @Override
    public void deleteBookById(Integer bookId) {
        bookRepository.deleteById(bookId);
    }
}
