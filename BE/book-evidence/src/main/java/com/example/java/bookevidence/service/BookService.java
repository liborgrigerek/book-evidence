package com.example.java.bookevidence.service;

import java.util.List;

import com.example.java.bookevidence.model.Book;

/**
 * Book Service.
 * 
 * @author Libor Grigerek
 *
 */

public interface BookService {
    List<Book> getAllBooks();
    List<Book> getRentedBooks();
    Book getBookById(Integer id);
    Book saveBook(Book book);
    void deleteBookById(Integer bookId);
}
