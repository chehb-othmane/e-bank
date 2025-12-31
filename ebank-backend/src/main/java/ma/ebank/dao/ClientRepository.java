package ma.ebank.dao;

import ma.ebank.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByIdentityNumber(String identityNumber);

    Optional<Client> findByUsername(String username);

    Optional<Client> findByEmail(String email);
}
