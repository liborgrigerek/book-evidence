package com.example.java.bookevidence.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Book Entity.
 * 
 * @author Libor Grigerek
 */

@Entity
@Table(name = "Book")
public class Book {

    // properties
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "authorId")
    private Author author;
    private String title;
    private Integer releaseYear;
    private String description;
    @JsonIgnoreProperties("rentedBooks") // to avoid circular refference in JSON serialization. More: https://stackoverflow.com/questions/16577907/hibernate-onetomany-relationship-causes-infinite-loop-or-empty-entries-in-json
    @ManyToOne(optional = true)
    @JoinColumn(name = "readerId")
    private Reader reader;
    private LocalDate rentedWhen;
    private LocalDate rentedUntil;

    /**
     * Default constructor.
     */
    protected Book() {}

    /**
     * Constructor.
     * @param author      author of a book.
     * @param title       title of a book.
     * @param description short description of a book.
     * @param releaseYear year of release.
     */
    public Book(Author author, String title, Integer releaseYear, String description) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.releaseYear = releaseYear;
        this.reader = null;
        this.rentedWhen = null;
        this.rentedUntil = null;
    }

    @Override
    public String toString() {
        return "Book [id=" + id + ", author=" + author + ", title=" + title + ", releaseYear=" + releaseYear
                + ", description=" + description + ", readerId=" + ((reader != null) ? reader.getId() : null) + ", rentedWhen=" + rentedWhen
                + ", rentedUntil=" + rentedUntil + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
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
        Book other = (Book) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    // getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
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
