package ma.ebank.service.impl;

import lombok.RequiredArgsConstructor;
import ma.ebank.dao.BankAccountRepository;
import ma.ebank.dao.ClientRepository;
import ma.ebank.enums.AccountStatus;
import ma.ebank.model.BankAccount;
import ma.ebank.model.Client;
import ma.ebank.service.interfaces.BankAccountService;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class BankAccountServiceImpl implements BankAccountService {

    private final BankAccountRepository bankAccountRepository;
    private final ClientRepository clientRepository;

    @Override
    public BankAccount createAccount(String rib, Long clientId) {

        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client inexistant"));

        BankAccount account = new BankAccount();
        account.setRib(rib);
        account.setBalance(0.0);
        account.setCreatedAt(new Date());
        account.setStatus(AccountStatus.OPENED);
        account.setClient(client);

        return bankAccountRepository.save(account);
    }
}
