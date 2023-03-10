package com.example.java.bookevidence.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.java.bookevidence.model.Reader;
import com.example.java.bookevidence.repository.ReaderRepository;
import com.example.java.bookevidence.service.ReaderService;

/**
 * Implementation of Reader Service.
 * 
 * @author Libor Grigerek
 *
 */

@Service
public class ReaderServiceImpl implements ReaderService {
    // logger 
    private static final Logger log = LoggerFactory.getLogger(ReaderServiceImpl.class);
    
    // repositories
    private final ReaderRepository readerRepository;
    
    
    /**
     * Constructor.
     * @param readerRepository reader repository.
     */
    public ReaderServiceImpl(ReaderRepository readerRepository) {
        this.readerRepository = readerRepository;
    }

    /**
     * Returns all readers.
     * @return all readers.
     */
    @Override
    public List<Reader> getAllReaders() {
        return readerRepository.findAll();
    }

    /**
     * Returns reader by id.
     * @return reader by id.
     */
    @Override
    public Reader getReaderById(Integer id) {
        return readerRepository.findById(id).orElse(null);
    }

    /**
     * Saves given reader.
     * @return saved entity.
     */
    @Override
    public Reader saveReader(Reader reader) {
        return readerRepository.save(reader);
    }

    /**
     * Deletes given reader.
     * @param readerId id of reader.
     */
    @Override
    public void deleteReaderById(Integer readerId) {
        readerRepository.deleteById(readerId);
    }

}
