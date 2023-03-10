package com.example.java.bookevidence.service;

import java.util.List;

import com.example.java.bookevidence.model.RentedBook;

/**
 * RentedBook Service.
 * 
 * @author Libor Grigerek
 *
 */

public interface RentedBookService {
    List<RentedBook> getAllRentedBooks();
    RentedBook getRentedBookByKey(Integer bookId, Integer readerId);
    List<RentedBook> getRentedBooksByReader(Integer readerId);
    List<RentedBook> getRentedBooksByBook(Integer bookId);
    RentedBook saveRentedBook(RentedBook rentedBook);
    void deleteRentedBookByKey(Integer bookId, Integer readerId);
}
