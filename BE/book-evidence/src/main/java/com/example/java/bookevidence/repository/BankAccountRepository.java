package com.example.java.bookevidence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.java.bookevidence.model.BankAccount;

/**
 * BankAccount Repository.
 * 
 * @author Libor Grigerek
 */

public interface BankAccountRepository extends JpaRepository<BankAccount, Integer> {
    
}
