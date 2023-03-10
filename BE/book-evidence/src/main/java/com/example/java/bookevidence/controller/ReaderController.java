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

import com.example.java.bookevidence.model.Reader;
import com.example.java.bookevidence.service.ReaderService;
import com.example.java.bookevidence.util.CommonUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


/**
 * Reader Controller.
 * 
 * @author Libor Grigerek
 *
 */

@RestController
@RequestMapping(path = CommonUtil.READER_URL)
public class ReaderController {
    // logger 
    private static final Logger log = LoggerFactory.getLogger(ReaderController.class);
    
    // services
    private final ReaderService readerService;    
    
    /**
     * Constructor.
     * @param readerService reader service.
     */
    public ReaderController(ReaderService readerService) {
        this.readerService = readerService;
    }


    /**
     * Returns all stored readers.
     * @return all stored readers.
     */
    @GetMapping(value = "all")
    public ResponseEntity<List<Reader>> getAllReaders() {
       log.debug("getAllReaders() started.");
       try {
           List<Reader> allReaders = readerService.getAllReaders();
           log.debug("allReaders={}", allReaders);
           return ResponseEntity.ok(allReaders);
       } catch (Exception ex) {
           log.error("getAllReaders() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Returns reader by his id.
     * @return reader by his id.
     */
    @GetMapping(value = "id")
    public ResponseEntity<Reader> getReaderById(@RequestParam("id") Integer id) {
       log.debug("getReaderById({}) started.", id);
       try {
           Reader reader = readerService.getReaderById(id);
           log.debug("reader={}", reader);
           return ResponseEntity.ok(reader);
       } catch (Exception ex) {
           log.error("getReaderById({}) error: {}", id, ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Saves given reader to the database.
     * @param reader reader.
     * @return saved entity.
     */
    @PostMapping(value="save")
    public ResponseEntity<Reader> saveReader(@RequestBody Reader reader) {
        log.debug("saveReader() started. Reader={}", reader);
        try {
            Reader savedReader = readerService.saveReader(reader);
            log.debug("saveReader() finished. savedReader={}", savedReader);
            return ResponseEntity.ok(savedReader);
       } catch (Exception ex) {
           log.error("saveReader() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }

    /**
     * Deletes given reader from the database.
     * @param readerId id of reader.
     * @return true if successfully deleted.
     */
    @DeleteMapping(value="delete")
    public ResponseEntity<Boolean> deleteAuthor(@RequestParam("id") Integer readerId) {
        log.debug("deleteAuthor() started. authorId={}", readerId);
        try {
            readerService.deleteReaderById(readerId);
            log.debug("deleteReader() finished successfully.");
            return ResponseEntity.ok(true);
       } catch (Exception ex) {
           log.error("deleteReader() error: {}", ex.getMessage());
           throw new ResourceException(HttpStatus.INTERNAL_SERVER_ERROR, CommonUtil.getStackTraceFromException(ex));
       }
    }
}
