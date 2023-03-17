package com.example.java.bookevidence.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * Reader Entity.
 * 
 * @author Libor Grigerek
 */

 @Entity
 @Table(name = "Reader")
public class Reader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstname;
    private String lastname;
    private String street;
    private String city;
    private String zipCode;
    @JsonIgnoreProperties("reader") // to avoid circular refference in JSON serialization. More: https://stackoverflow.com/questions/16577907/hibernate-onetomany-relationship-causes-infinite-loop-or-empty-entries-in-json
    @OneToMany(mappedBy = "reader")
    private List<Book> rentedBooks;

    /**
     * Default constructor.
     */
    protected Reader() {}

    /**
     * Constructor.
     * @param rentedBooks 
     * @param firstname
     * @param lastname
     * @param street
     * @param city
     * @param zipCode
     */
    public Reader(String firstname, String lastname, String street, String city,
            String zipCode) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
    }

    @Override
    public String toString() {
        return "Reader [id=" + id + ", firstname=" + firstname + ", lastname=" + lastname + ", street=" + street
                + ", city=" + city + ", zipCode=" + zipCode + ", rentedBooks=" + rentedBooks + "]";
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
        Reader other = (Reader) obj;
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

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public List<Book> getRentedBooks() {
        return rentedBooks;
    }

    public void setRentedBooks(List<Book> rentedBooks) {
        this.rentedBooks = rentedBooks;
    }
    
}
