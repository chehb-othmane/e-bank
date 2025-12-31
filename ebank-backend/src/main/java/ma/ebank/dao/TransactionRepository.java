package ma.ebank.dao;

import ma.ebank.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findTop10ByBankAccount_RibOrderByDateDesc(String rib);

    List<Transaction> findByBankAccount_RibAndDateBetween(
            String rib,
            Date from,
            Date to
    );
}
