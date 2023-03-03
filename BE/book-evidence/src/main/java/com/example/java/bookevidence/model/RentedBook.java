package com.example.java.bookevidence.model;

import java.time.LocalDate;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**
 * Rented Book Entity.
 * 
 * @author Libor Grigerek
 */


@Entity
@Table(name = "RentedBook")
public class RentedBook {

    // Primary key of a table
    @Embeddable
    public static class Key {
        private Integer bookId;
        private Integer readerId;
        protected Key() {}
        public Key(Integer bookId, Integer readerId) {
            this.bookId = bookId;
            this.readerId = readerId;
        }
        @Override
        public String toString() {
            return "Key [bookId=" + bookId + ", readerId=" + readerId + "]";
        }
        @Override
        public int hashCode() {
            final int prime = 31;
            int result = 1;
            result = prime * result + ((bookId == null) ? 0 : bookId.hashCode());
            result = prime * result + ((readerId == null) ? 0 : readerId.hashCode());
            return result;
        }
        @Override
        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (obj == null)
                return false;
            if (getClass() != obj.getClass())
                return false;
            Key other = (Key) obj;
            if (bookId == null) {
                if (other.bookId != null)
                    return false;
            } else if (!bookId.equals(other.bookId))
                return false;
            if (readerId == null) {
                if (other.readerId != null)
                    return false;
            } else if (!readerId.equals(other.readerId))
                return false;
            return true;
        }
        public Integer getBookId() {
            return bookId;
        }
        public void setBookId(Integer bookId) {
            this.bookId = bookId;
        }
        public Integer getReaderId() {
            return readerId;
        }
        public void setReaderId(Integer readerId) {
            this.readerId = readerId;
        }        
    }

    // properties
    @EmbeddedId
    private RentedBook.Key key;
    @OneToOne
    @JoinColumn(name = "bookId", updatable = false, insertable = false)
    private Book book;
    @OneToOne
    @JoinColumn(name = "readerId", updatable = false, insertable = false)
    private Reader reader;
    private LocalDate dueDate;

    /**
     * Default Constructor.
     */
    protected RentedBook() {}

    /**
     * Constructor.
     * @param book    rented book.
     * @param reader  reader who rented the book.
     * @param dueDate due date when reader must return the book.
     */
    public RentedBook(Book book, Reader reader, LocalDate dueDate) {
        this.book = book;
        this.reader = reader;
        this.dueDate = dueDate;
    }

    @Override
    public String toString() {
        return "RentedBook [book=" + book + ", reader=" + reader + ", dueDate=" + dueDate + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((book == null) ? 0 : book.hashCode());
        result = prime * result + ((reader == null) ? 0 : reader.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        RentedBook other = (RentedBook) obj;
        if (book == null) {
            if (other.book != null)
                return false;
        } else if (!book.equals(other.book))
            return false;
        if (reader == null) {
            if (other.reader != null)
                return false;
        } else if (!reader.equals(other.reader))
            return false;
        return true;
    }
    
    
}
