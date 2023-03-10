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
    private LocalDate rentedWhen;
    private LocalDate rentedUntil;

    /**
     * Default Constructor.
     */
    protected RentedBook() {}

    /**
     * Constructor.
     * @param book        rented book.
     * @param reader      reader who rented the book.
     * @param rentedWhen  when a reader rented a book
     * @param rentedUntil due date when reader must return the book.
     */
    public RentedBook(Book book, Reader reader, LocalDate rentedWhen, LocalDate rentedUntil) {
        this.book = book;
        this.reader = reader;
        this.rentedWhen = rentedWhen;
        this.rentedUntil = rentedUntil;
    }

    @Override
    public String toString() {
        return "RentedBook [key=" + key + ", book=" + book + ", reader=" + reader + ", rentedWhen=" + rentedWhen
                + ", rentedUntil=" + rentedUntil + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((key == null) ? 0 : key.hashCode());
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
        if (key == null) {
            if (other.key != null)
                return false;
        } else if (!key.equals(other.key))
            return false;
        return true;
    }

    public RentedBook.Key getKey() {
        return key;
    }

    public void setKey(RentedBook.Key key) {
        this.key = key;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Reader getReader() {
        return reader;
    }

    public void setReader(Reader reader) {
        this.reader = reader;
    }

    public LocalDate getRentedWhen() {
        return rentedWhen;
    }

    public void setRentedWhen(LocalDate rentedWhen) {
        this.rentedWhen = rentedWhen;
    }

    public LocalDate getRentedUntil() {
        return rentedUntil;
    }

    public void setRentedUntil(LocalDate rentedUntil) {
        this.rentedUntil = rentedUntil;
    }
    
}
