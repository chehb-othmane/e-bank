package ma.ebank.dao;

import ma.ebank.model.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    Optional<BankAccount> findByRib(String rib);

    List<BankAccount> findByClient_Id(Long clientId);
}
