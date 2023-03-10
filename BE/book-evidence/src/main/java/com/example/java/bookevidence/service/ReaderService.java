package com.example.java.bookevidence.service;

import java.util.List;

import com.example.java.bookevidence.model.Reader;

/**
 * Reader Service.
 * 
 * @author Libor Grigerek
 *
 */

public interface ReaderService {
    List<Reader> getAllReaders();
    Reader getReaderById(Integer id);
    Reader saveReader(Reader reader);
    void deleteReaderById(Integer readerId);
}
